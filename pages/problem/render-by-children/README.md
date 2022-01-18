# 组件渲染问题

## 问题

在学习 useMemo 的时候发现，下面两种不同的写法会导致组件不同的渲染结果：

```html
<Text>count B: {countB}</Text>
```

```html
<Text>{`count B: ${countB}`}</Text>
```

## 原因

```js
const Case: React.FC = () => {
  const [countA, setCountA] = useState(0);
  const [countB, setCountB] = useState(0);

  const onClickA = useCallback(() => {
    setCountA(countA + 1);
  }, [countA]);

  const onClickB = useCallback(() => {
    setCountB(countB + 1);
  }, [countB]);

  return (
    <div>
      <Button onClick={onClickA}>Add A</Button>
      <Button onClick={onClickB}>Add B</Button>
      <Text>{`count A: ${countA}`}</Text>
      <Text>count B: {countB}</Text>
      <Text>
        <Text>{countB}</Text>
      </Text>
    </div>
  );
};
```

发现在点击 `Button A` 时 `Text B` 也会跟着一起重新渲染。查看 react devtool 后发现，  
`Text A` 的 `props` 为 `{ children: "count A: 0" }`，  
`Text B` 的 `props` 为 `{ children: [ "count B: ", 0 ] }`。  
所以是 `React.memo` 判断前后两次 `children` 中的 list 引用不一致，从而导致`Text B`每次都会被重新渲染。

## 拓展

尝试了第三种写法

```html
<Text>
  <Text>{countB}</Text>
</Text>
```

发现当 `children` 中包含除了 `string` 、`number` 基础类型之外对象时（比如 ReactNode 时），`React.memo` 方法默认的判断就不能够满足我们的需求了，需要根据具体情况为 `React.memo` 方法添加适合的判断函数。

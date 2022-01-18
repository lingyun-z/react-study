# UseMemo

`useMemo` 将方法的返回值保存值内存中，只有当其中的依赖发生变化才会重新计算该方法的返回值。`useMemo` 的返回值也可以包含函数，当返回一个函数时，其功能相当于 `useCallback`。

## Case 1

```
const Case: React.FC = () => {
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(0);
  const [submitTime, setSubmitTime] = useState(new Date().getTime());
  const [submitTotal, setSubmitTotal] = useState(0);
  const totalRef = useRef(0);

  const total = useMemo(() => {
    totalRef.current = price * count;
    return totalRef.current;
  }, [price, count]);

  const onSubmit = useCallback(() => {
    setSubmitTotal(totalRef.current);
    setSubmitTime(new Date().getTime());
  }, [totalRef]);

  return (
    <div>
      <input
        value={count}
        onChange={(event) => setCount(Number(event.target.value))}
      />
      <input
        value={price}
        onChange={(event) => setPrice(Number(event.target.value))}
      />
      <Button onClick={onSubmit}>submit</Button>
      <Text>{`total: ${total}`}</Text>
      <Text>{`submitTime: ${submitTime}`}</Text>
      <Text>{`submitTotal: ${submitTotal}`}</Text>
    </div>
  );
};
```

为 `total` 的计算，添加了 `useMemo` 方法。避免了因为点击 submit 按钮后，`setState` 方法触发的组建重新渲染时，`total` 进行不必要的计算。

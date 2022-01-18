# useCallBack

`useCallBack` 将方法储存到内存中，只有当依赖值发生变化时，才会重新声明函数，避免组建重新渲染时不必要的声明开销。通常用于组件中方法参数的传递，减少不必要的渲染，以此来优化组件的性能。
需要注意的是，判断依赖值变化也需要额外开销，所以并不是所有的方法都需要使用 `useCallBack` 方法。

## Button 组件

```js
const Button: React.FC<ButtonProps> = (props) => {
  const { onClick, children } = props;
  const time = new Date().getTime();
  console.log(`button render ${children}`);

  return (
    <button
      onClick={(event) => {
        onClick?.(event);
      }}
    >
      {`${children} ${time}`}
    </button>
  );
};
```

## Case 1

```js
const HowToUseUseCallBack: React.FC = () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [c, setC] = useState(0);

  const onClick1 = () => {
    setA(a + 1);
  };

  const onClick2 = useCallback(() => {
    setB(b + 1);
  }, [b]);

  return (
    <div>
      <Button onClick={onClick1}>Button 1</Button>
      <Button onClick={onClick2}>Button 2</Button>
      <Button
        onClick={() => {
          setC(c + 1);
        }}
      >
        Button 3
      </Button>
    </div>
  );
};
```

当点击 `Button` 后会调用 `useState` 的 `set` 方法，来触发当前组件的渲染。

### Button1&3 的渲染过程

在渲染时会声明一个新的 `onClick` 方法，使用了 `React.memo` 方法的 `Button` 组件会比较(===)新传入的和之前的 `onClick` 参数，由于是新声明的方法和两者的引用不同，所以会重新渲染。

### Button2 的渲染过程

由于 `onClick2` 在声明时使用了 `useCallback` 方法，会将先前的声明的方法保存至内存中。再次渲染时，会先判断 `useCallback` 方法第二个参数中的依赖是否发生变化，再决定是否需要声明一个新的方法。在点击了 `Button1` 后，参数 `b` 的值没有发生变化， `onClick2` 依然引用上次声明的方法。引用没有发生改变，所以 `React.memo` 方法判断 `Button2` 不需要重新渲染。

## Case 2

```
const Case2: React.FC = () => {
  const [text, setText] = useState("");
  const textRef = useRef("");
  const onClick1 = useCallback(() => {
    console.log(text);
  }, [text]);

  const onClick2 = useCallback(() => {
    console.log(textRef.current);
  }, [textRef]);

  return (
    <div>
      <input
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          textRef.current = e.target.value;
        }}
      />

      <Button onClick={onClick1}>Case2 Button 1</Button>
      <Button onClick={onClick2}>Case2 Button 2</Button>
    </div>
  );
};
```

`text` 是一个和 `input` 双向绑定的值，在输入的过程中会发生频繁地变化，使得整个组件频繁地渲染。而通常我们只需要这个值的最终结果。

### Button1 的渲染过程

`onClick1` 虽然使用了 `useCallback` 方法，但是每次输入时 `text` 值都发生了变化，使得 `Button1` 每次输入时都会进行渲染。相较于不使用 `useCallback` 方法，不仅没有减少渲染次数，而且每次渲染之前都需要额外地比较 `text` 的值前后是否一致，可以视为一种负优化。

### Button2 的渲染过程

为了避免这种情况发生，使用了 `useRef` 来存放 `text` 的值。在 `useCallback` 中用 `textRef.current`，来代替 `text`，并用 `textRef` 作为判断是否要更新的依赖。虽然每次输入时都会改变 `textRef.current` 的值，但没有改变 `textRef` 的引用，就不会导致 `onClick2` 更新，从而避免了 `Button2` 的渲染。

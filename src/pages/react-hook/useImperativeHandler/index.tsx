import React, {
  ChangeEvent,
  InputHTMLAttributes,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Button from "../../../component/Button";
import Text from "../../../component/Text";

interface InputRef {
  focus: () => void;
}

const Input = React.forwardRef<InputRef, InputHTMLAttributes<HTMLInputElement>>(
  function Input(props, ref) {
    const inputRef = useRef<HTMLInputElement>(null);

    const focus = () => {
      inputRef.current.focus();
    };

    useImperativeHandle(ref, () => ({
      focus,
    }));

    return (
      <>
        <input ref={inputRef} {...props} />
        <Text>render</Text>
      </>
    );
  }
);

const Case: React.FC = () => {
  const inputRef = useRef<InputRef>(null);
  const [value, setValue] = useState("");
  const clickHandler = useCallback(() => {
    inputRef.current.focus();
  }, []);
  const changeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "16rem",
        marginBottom: "2rem",
      }}
    >
      <Input ref={inputRef} value={value} onChange={changeHandler} />
      <Button onClick={clickHandler}>click</Button>
    </div>
  );
};

const HowToUseUseImperativeHandler: React.FC = () => {
  return <Case />;
};

export default React.memo(HowToUseUseImperativeHandler);

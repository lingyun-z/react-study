import React, { useCallback, useRef, useState } from "react";
import Button from "../../../../component/Button";

const Case1: React.FC = () => {
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "16rem",
        marginBottom: "2rem",
      }}
    >
      <Button onClick={onClick1}>{`Case1 Button 1:  ${a}`}</Button>
      <Button onClick={onClick2}>{`Case1 Button 2:  ${b}`}</Button>
      <Button
        onClick={() => {
          setC(c + 1);
        }}
      >
        {`Case1 Button 3:  ${c}`}
      </Button>
    </div>
  );
};

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "16rem",
        marginBottom: "2rem",
      }}
    >
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

const HowToUseUseCallBack: React.FC = () => {
  return (
    <>
      <Case1 />
      <Case2 />
    </>
  );
};

export default React.memo(HowToUseUseCallBack);

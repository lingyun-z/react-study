import React, { useState, useTransition } from "react";
import Button from "../../../../component/Button";
import Text from "../../../../component/Text";

const Case: React.FC = () => {
  const [count, setCount] = useState(0);
  const [isPending, startTransition] = useTransition();

  const clickHandler = () => {
    startTransition(() => {
      setTimeout(() => {
        setCount((prevState) => prevState + 1);
      }, 1000);
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "16rem",
        marginBottom: "2rem",
      }}
    >
      <Button onClick={clickHandler}>click</Button>
      <Text>{count}</Text>
    </div>
  );
};

const HowToUseUseTransition: React.FC = () => {
  return (
    <>
      <Case />
    </>
  );
};

export default React.memo(HowToUseUseTransition);

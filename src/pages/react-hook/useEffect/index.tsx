import React, { useCallback, useEffect, useState } from "react";
import Button from "../../../../component/Button";

const Case: React.FC = () => {
  const [count, setCount] = useState(0);

  const click = useCallback(() => {
    setCount((prevState) => prevState + 1);
  }, []);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
    return () => {
      console.log(count);
    };
  });

  useEffect(() => {
    document.title = `Hello world!`;
    setCount((prevState) => prevState + 1);
  }, []);

  return (
    <div>
      <p>You clicked {count} times</p>
      <Button onClick={click}>Click!</Button>
      <div
        style={{
          background: "red",
          width: "100px",
          height: "100px",
        }}
      />
      {count === 0 && (
        <div
          style={{
            background: "blue",
            width: "100px",
            height: "100px",
          }}
        />
      )}
    </div>
  );
};

const HowToUseUseEffect: React.FC = () => {
  return (
    <>
      <Case />
    </>
  );
};

export default React.memo(HowToUseUseEffect);

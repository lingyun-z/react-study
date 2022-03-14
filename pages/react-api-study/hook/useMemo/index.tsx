import React, { useState, useMemo, useCallback, useRef } from "react";
import Button from "../../../../component/Button";
import Text from "../../../../component/Text";

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "16rem",
        marginBottom: "2rem",
      }}
    >
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

const HowToUseUseMemo: React.FC = () => {
  return (
    <>
      <Case />
    </>
  );
};

export default React.memo(HowToUseUseMemo);

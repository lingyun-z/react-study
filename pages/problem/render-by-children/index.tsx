import React, { useCallback, useState } from "react";
import Button from "../../../component/Button";
import Text from "../../../component/Text";

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "16rem",
        marginBottom: "2rem",
      }}
    >
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

const ChildrenRenderProblem: React.FC = () => {
  return (
    <>
      <Case />
    </>
  );
};

export default ChildrenRenderProblem;

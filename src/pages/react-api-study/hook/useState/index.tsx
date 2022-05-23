import React, { useState } from "react";
import Button from "../../../../component/Button";
import Text from "../../../../component/Text";

const Case: React.FC = () => {
  const [count, setCount] = useState(() => {
    return 0;
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "16rem",
        marginBottom: "2rem",
      }}
    >
      <Button onClick={() => setCount(1)}>click</Button>
      <Text>{count}</Text>
    </div>
  );
};

const HowToUseUseState: React.FC = () => {
  return (
    <>
      <Case />
    </>
  );
};

export default React.memo(HowToUseUseState);

import React from "react";

const Text: React.FC<{
  children?: string | number | React.ReactNode;
  text?;
}> = (props) => {
  const { children } = props;

  return (
    <p>
      {children} {new Date().getTime()}
    </p>
  );
};

export default React.memo(Text);

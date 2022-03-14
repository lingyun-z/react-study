import React, { ReactNode } from "react";

interface TextProps {
  children: ReactNode;
}

const Text = (props: TextProps) => {
  const time = new Date().getTime();

  return (
    <p>
      {props.children} {time}
    </p>
  );
};

export default React.memo(Text);

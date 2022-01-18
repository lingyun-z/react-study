import React from "react";

interface TextProps {
  children?: string | number | React.ReactNode;
}

const Text: React.FC<TextProps> = (props) => {
  const { children } = props;
  const time = new Date().getTime();

  return (
    <p>
      {children} {time}
    </p>
  );
};

export default React.memo(Text);

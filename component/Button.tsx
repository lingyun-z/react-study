import React from "react";

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { onClick, children } = props;
  const time = new Date().getTime();

  return (
    <button
      onClick={(event) => {
        onClick?.(event);
      }}
    >
      {`${children} ${time}`}
    </button>
  );
};

export default React.memo(Button);

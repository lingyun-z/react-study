import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button: React.FC<
  ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
> = (props) => {
  const { onClick, children, ...rest } = props;
  const time = new Date().getTime();

  return (
    <button
      onClick={(event) => {
        onClick?.(event);
      }}
      {...rest}
    >
      {`${children} ${time}`}
    </button>
  );
};

export default React.memo(Button);

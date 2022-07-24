import React from "react";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  styleClass?: string;
}

const AuthInput = (props: IProps) => {
  const { styleClass } = props;

  return (
    <input
      className={`block
    w-full
    px-3
    py-1.5
    text-base
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ${styleClass}`}
      {...props}
    />
  );
};

export default AuthInput;

import React, { ChangeEvent, KeyboardEvent } from "react";

interface InputProps {
  name?: string;
  type: string;
  placeholder: string;
  value: string;
  width?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  name,
  type,
  width,
  placeholder,
  value,
  onChange,
  onKeyDown,
}) => {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      className={`h-10 w-44 sm:w-96 md:w-96 lg:w-96 xl:w-96 ${width} border outline-none rounded px-4 focus-within:border-blue-700 `}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
};

export default Input;

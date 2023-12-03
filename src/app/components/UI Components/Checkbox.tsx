import React, { ChangeEvent } from "react";

interface CheckboxProps {
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange }) => {
  return (
    <input
      type="checkbox"
      className={`h-4 w-4`}
      checked={checked}
      onChange={onChange}
    />
  );
};

export default Checkbox;

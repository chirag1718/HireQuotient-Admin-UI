import React, { ReactNode } from "react";

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  borderColor?: string;
  bgColor?: string;
  hoverColor?: string;
  activeColor?: string;
  scale: number | string;
  icon?: React.ReactElement;
  color: string;
  height: string;
  width: string;
  type: "solid" | "secondary";
  text?: string;
  responsive?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  bgColor,
  borderColor,
  hoverColor,
  activeColor,
  scale,
  icon,
  color,
  height,
  width,
  type,
  text,
  responsive,
}) => {
  /**
   * Reusable custom button component
   * @returns ReactNode
   */
  return (
    <button
      disabled={disabled}
      className={`flex items-center justify-center cursor-pointer ${height} ${width} rounded group isHovered transition-all duration-100 ease-in border ${responsive} ${
        type === "solid" ? bgColor : ""
      } ${borderColor} active:scale-${scale} hover:${hoverColor} ${activeColor}`}
      onClick={onClick}
    >
      {icon &&
        React.cloneElement(icon, {
          className: `group-[.isHovered] group-hover:${activeColor} group-hover:${hoverColor} ${color}`,
          color: color,
        })}

      {text && <p>{text}</p>}
    </button>
  );
};

export default Button;

import React from "react";
import { ButtonCss } from "./Button.css";
import { theme } from "../../../../../assets/style/theme/theme.css.js";

interface ButtonProps {
  variant : "default" | "primary" | "warring";
  size?: 's' | 'm' | 'l'| 'xl';
  icon? : React.ReactElement;
  children: string;
  disabled? : boolean;
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export default  function Button({
  variant,
  size,
  icon,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`${theme} ${ButtonCss({
        variant : variant,
        size : size,
        icon : icon ? true : false
      })}`}
      disabled={disabled}
      {...props}
    >
      {icon}{props.children}
    </button>
  );
};

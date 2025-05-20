import React from "react";
// Use vanilla-extract
import { InputCss } from "./Input.css";
import { theme } from "../../../../../../shared/assets/style/theme/theme.css";
 
interface InputProps {
    placeholder : string;
    value? : string;
    type : 'text'|'number'|'password';
    themeColor? : "default" | "transparent" | "primary" | "warring";
    size? : "s" | "m" | "l" | "xl"; 
    disabled? : boolean;
    onChange? : ()=> void;
}

export default function Input({type, themeColor, disabled, size, placeholder}:InputProps) {
    return (
        <input className={`${theme} ${InputCss({
            size : size,
            themeColor : themeColor,
        })}`} 
            type={type} 
            placeholder={placeholder}
            defaultValue={''} 
            disabled={disabled}
        />
    )
}
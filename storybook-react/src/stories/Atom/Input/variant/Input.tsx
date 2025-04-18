// Use vanilla-extract
import { InputCss } from "./Input.css";

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
        <input className={InputCss({
            size : size,
            themeColor : themeColor,
        })} 
            type={type} 
            placeholder={placeholder}
            defaultValue={''} 
            disabled={disabled}
        />
    )
}
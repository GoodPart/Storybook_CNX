// import Title style
import React from "react";
import {title} from "./Title.css";

interface TitleProps  {
    color? : "primary" | "secondary" | "warring";
    tag : keyof React.JSX.IntrinsicElements;
    children : React.ReactNode;
    size? : "s" | "m" | "l" | "xl";
    weight? : "thin" | "regular" | "medium" | "bold" | "heavy"
}


export function Title({color, size, weight, children, tag}:TitleProps) {
    const Tag = tag;

    return <Tag className={title({
        color : color,
        size : size,
        bold : weight
    })}>{children}</Tag>
}
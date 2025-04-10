import { Source, Subtitle } from "@storybook/blocks";
import React from "react";

import { MdxCodeBlockStyle, h2Color } from "./Mdx.css";



type MdxCodeBlockProps = {
    title : string;
    code : string ;
}

export function MdxCodeBlock({title, code}:MdxCodeBlockProps) {
    return (
        <div className={MdxCodeBlockStyle}>
            <h2 className={h2Color}>{title}</h2>
            <Source code={code} />
        </div>
    )
}

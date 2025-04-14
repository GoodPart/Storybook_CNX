import { Source, Subtitle } from "@storybook/blocks";
import React from "react";

import { MdxCodeBlockStyle, h2Color } from "./Mdx.css";
import { Title } from "../Title/Title.tsx";


type MdxCodeBlockProps = {
    title : string;
    code : string ;
}

export function MdxCodeBlock({title, code}:MdxCodeBlockProps) {
    return (
        <div>
            <Title size="l" tag="span" weight="bold" >{title}</Title>
            <Source code={code} />
        </div>
    )
}

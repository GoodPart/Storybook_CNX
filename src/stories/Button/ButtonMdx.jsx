import React, {useState, Suspense} from "react"
import { Source, Subtitle, Title } from "@storybook/blocks"


/* import of React */
import * as ButtonReact from "../../../storybook-react/src/stories/Atom/Button/variant/Button.tsx?raw"

/* import of Core */
import * as ButtonHtml from "../../../storybook-core/src/stories/Button/button.html?raw"
import * as ButtonCss from "../../../storybook-core/src/stories/Button/button.css?raw"
import * as ButtonJS from "../../../storybook-core/src/stories/Button/button.js?raw"
import { Button } from "../../../storybook-react/src/stories/Atom/Button/variant/Button.tsx"


import {MdxCodeBlock} from "../../shared/components/Mdx/Mdx.tsx"

export default function MdxWrap() {
    const [radioCheck, setRadioCheck] = useState('React');

    const handleChange = (e)=> {
        const {name, value} = e.target;
        setRadioCheck(value)
    }

    return (
        <div>
            <iframe
                src="http://localhost:6007/iframe.html?viewMode=story&id=atom-button-variant--primary&globals="
                width="100%"
            ></iframe>

            <div className="selector-wrap" style={{display : "flex", justifyContent : "flex-end", gap :"8px" }}>
                <Button primary={radioCheck == 'React'} label="React" onClick={handleChange} value={"React"}/>
                <Button primary={radioCheck == 'Core'} label="Core" onClick={handleChange} value={"Core"}/>
            </div>
            <div style={{position : "relative"}}>
                <div style={radioCheck === "React" ? {display : "block"} : {display : "none"}}>
                    <div>
                        <MdxCodeBlock title={"JSX"} code={ButtonReact.default} />
                    </div>
                </div>
                <div style={radioCheck === "Core" ? {display : "block"} : {display : "none"}}>
                    <div>
                        <MdxCodeBlock title={"HTML"} code={ButtonHtml.default} />
                        <MdxCodeBlock title={"CSS"} code={ButtonCss.default} />
                        <MdxCodeBlock title={"JAVASCRIPT"} code={ButtonJS.default} />
                    </div>
                </div>
            </div>
        </div>
    )
}
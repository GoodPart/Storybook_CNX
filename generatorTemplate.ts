export const templateMdx = (fileName) =>
`import MdxWrap from "./${fileName}Mdx.jsx"


# ${fileName}
기본 ${fileName} 컴포넌트입니다.<br />
다양한 프레임워크별 코드를 확인할 수 있습니다.

<div className="component-wrap">
    <MdxWrap />
</div>
`

export const templateJsx = (fileName) => `
import React, {useState, Suspense} from "react"
import {MdxCodeBlock} from "../../shared/components/Mdx/Mdx.tsx"


export default function ${fileName}() {
    const [radioCheck, setRadioCheck] = useState('React');

    const handleChange = (e)=> {
        const {name, value} = e.target;
        setRadioCheck(value);
    }
    return (
        <div>
            {/* 
                iframe src작성법
                src="{포트번호}/iframe.html?viewMode=story&id=input-components-input--default"
             */}
            <iframe
                // src="http://localhost:6007/iframe.html?viewMode=story&id=input-components-input--default&globals="
                width="100%"
            ></iframe>

            <div className="selector-wrap" style={{display : "flex", justifyContent : "flex-end", gap :"8px" }}>
                <button label="" onClick={handleChange} value={"React"}>React</button>
                <button label="" onClick={handleChange} value={"Core"}>Core</button>
            </div>
            <div style={{position : "relative"}}>
                <div style={radioCheck === "React" ? {display : "block"} : {display : "none"}}>
                    <div>
                        <h3>React</h3>
                        {/* <MdxCodeBlock title={"JSX"} code={InputReact.default} /> */} 
                    </div>
                </div>
                <div style={radioCheck === "Core" ? {display : "block"} : {display : "none"}}>
                    <div>
                        <h3>Core</h3>
                        {/* <MdxCodeBlock title={"Undefined"} code="none" /> */} 
                    </div>
                </div>
            </div>
        </div>
    )
}
`
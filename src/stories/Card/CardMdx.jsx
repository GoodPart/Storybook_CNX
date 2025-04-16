
import React, {useState, Suspense} from "react"
import {MdxCodeBlock} from "../../shared/components/Mdx/Mdx.tsx"


export default function Card() {
    const [radioCheck, setRadioCheck] = useState('React');

    const handleChange = (e)=> {
        const {name, value} = e.target;
        setRadioCheck(value);
    }
    return (
        <div>
            {/* 
                iframe src작성법
                src="{포트번호}/iframe.html?viewMode=story&id={컴포넌트}&globals="
             */}
            <iframe
                // src="http://localhost:6007/iframe.html?viewMode=story&id=input-components-input--default&globals="
                width="100%"
            ></iframe>

            {/* 
                반복문 필요
            */}
            <div className="selector-wrap" style={{display : "flex", justifyContent : "flex-end", gap :"8px" }}>
                <button label="" onClick={handleChange} value={"React"}>React</button>
                <button label="" onClick={handleChange} value={"Core"}>Core</button>
            </div>

            {/* 
                상태에 맞는 변수 필요
            */}
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

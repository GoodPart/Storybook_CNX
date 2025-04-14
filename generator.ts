import fs from "fs";
import { templateJsx, templateMdx } from "./generatorTemplate.ts";
const path = `./src/stories/`;
const getPrams = process.argv[2];

const fileTemplate = `
import MdxWrap from "./${process.argv[2]}Mdx.jsx"


# ${process.argv[2]}
기본 ${process.argv[2]} 컴포넌트입니다.<br />
다양한 프레임워크별 코드를 확인할 수 있습니다.

<div className="component-wrap">
    <MdxWrap />
</div>
`

const fileMdxTemplate = `
import React, {useState, Suspense} from "react"
import {MdxCodeBlock} from "../../shared/components/Mdx/Mdx.tsx"


export default function ${process.argv[2]}() {
    const [radioCheck, setRadioCheck] = useState('React');

    const handleChange = (e)=> {
        const {name, value} = e.target;
        setRadioCheck(value);
    }
    return (
        <div>
            <iframe
                src="http://localhost:6007/iframe.html?viewMode=story&id=input-components-input--default&globals="
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
fs.readdir('./src/stories/', (err, filelist)=> {
    filelist.map(file=> {
        if(file != getPrams) {
            crtDir()
            crtFileJsx()
            crtFile()
        }else {
            console.log("not find folder")
        }
    })

})

const crtDir = () => fs.mkdirSync(`${path}${getPrams}`, (err: any)=> {
    if(err) throw err;
    else console.log("@@@@@@ -------------file is created!!")
})
const crtFile = () => fs.writeFileSync(`${path}${process.argv[2]}/${process.argv[2]}.mdx`, templateMdx(getPrams), (err: any)=> {
    if(err) throw err;
    else console.log("@@@@@@ -------------file is created!!")
})
const crtFileJsx = () => fs.writeFileSync(`${path}${process.argv[2]}/${process.argv[2]}Mdx.jsx`, templateJsx(getPrams), (err: any)=> {
    if(err) throw err;
    else console.log("@@@@@@ -------------file is created!!")
})

import React, {useState, Suspense, useEffect} from "react"
// import {MdxCodeBlock} from "../../shared/components/Mdx/Mdx.tsx"
import { MdxCodeBlock } from "../../../shared/components/Mdx/Mdx.tsx"
import {mdxViewItem, mdxViewStyle, mdxWrapStyle, mdxSwicherGroup, mdxVariantItem, mdxVariantWrap,mdxVariantGroup, mdxVariantLinkGroup} from "../../../shared/components/Mdx/Mdx.css"
// import Button from "../../../storybook-react/src/stories/Atom/Button/variant/Button.tsx"
import Button from "../../../shared/components/component/react/atom/Button/Button.tsx"

import { theme } from "../../../shared/assets/style/theme/theme.css.ts"

{/* location of React source */}
// import * as Reacttsx from "../../../storybook-react/src/stories/Atom/Input/variant/Input.tsx?raw";
import * as Reacttsx from "../../../shared/components/component/react/atom/Button/Button.tsx?raw";
{/* location of Core source */}
// import * as Corehtml from "../../../storybook-core/src/stories/Input/input.html?raw";
// import * as Corecss from "../../../storybook-core/src/stories/Input/input.css?raw";
// import * as Corejs from "../../../storybook-core/src/stories/Input/input.js?raw";
import * as Corehtml from ".././../../shared/components/component/core/atom/Button/button.html?raw";
import * as Corecss from ".././../../shared/components/component/core/atom/Button/button.scss?raw";
import * as Corejs from ".././../../shared/components/component/core/atom/Button/button.js?raw";


export default function MdxWrap() {
    const [radioCheck, setRadioCheck] = useState('React');
    const [port, setPort] = useState(`${import.meta.env.VITE_LOCAL_REACT_URI}`);
    // const [port, setPort] = useState(`${import.meta.env.VITE_CHROMATIC_REACT_URI}`);
    const [variantValue, setVariantValue] = useState("default");

    const switcher = (target) => {
          switch (target) {
              case "React":
            //   return 6007
            return import.meta.env.VITE_LOCAL_REACT_URI
            //   return import.meta.env.VITE_CHROMATIC_REACT_URI
              case "Core":
            //   return 6006
            return import.meta.env.VITE_LOCAL_CORE_URI
            //   return import.meta.env.VITE_CHROMATIC_CORE_URI
            default:
              break;
          }
        }
        
    const handleChange = (e)=> {
        const {name, value} = e.target;

        switcher(value)
        setPort(switcher(value))
        setRadioCheck(value);
    }

    const variantChange = (e) => {
      const {name, value} = e.target;
      setVariantValue(value);
    }
    useEffect(()=> {

    }, [variantValue, radioCheck])
    return (
        <div className={mdxWrapStyle}>
            <div className={mdxViewStyle}>
              <iframe
                  className={`${mdxViewItem} ${radioCheck != "React" ? 'hide' : ''}`}
                  src={`${import.meta.env.VITE_LOCAL_REACT_URI}/iframe.html?id=atom-button-variant--${variantValue}&viewMode=story&refId=react&globals=`}
                //   src={`${import.meta.env.VITE_CHROMATIC_REACT_URI}/iframe.html?id=atom-input-variant--${variantValue}&viewMode=docs&refId=react&globals=`}
                  width="100%"
              ></iframe>
              <iframe
                  className={`${mdxViewItem} ${radioCheck != "Core" ? 'hide' : ''}`}
                  src={`${import.meta.env.VITE_LOCAL_CORE_URI}/iframe.html?id=atom-button-variant--${variantValue}&viewMode=story&refId=react&globals=`}
                //   src={`${import.meta.env.VITE_CHROMATIC_CORE_URI}/iframe.html?id=atom-input-variant--${variantValue}&viewMode=docs&refId=react&globals=`}
                  width="100%"
              ></iframe>
              
              <div className={mdxVariantGroup}>
                <ul className={mdxVariantWrap}>
                  <li className={`${theme} ${mdxVariantItem}`}>
                    <input type="radio" name="variant" id="default" onChange={variantChange} value={"default"}  checked={variantValue == 'default'}/><label htmlFor="default">default</label>
                  </li>  
                  <li className={`${theme} ${mdxVariantItem}`}>
                    <input type="radio" name="variant" id="primary" onChange={variantChange} value={"primary"}  checked={variantValue == 'primary'}/><label htmlFor="primary">primary</label>
                  </li>  
                  <li className={`${theme} ${mdxVariantItem}`}>
                    <input type="radio" name="variant" id="warring" onChange={variantChange} value={"warring"}  checked={variantValue == 'warring'}/><label htmlFor="warring">warring</label>
                  </li>  
                </ul>
              </div>
              
            </div>
            <div className={mdxSwicherGroup} >
              <Button label={"React"} primary={radioCheck == 'React'} onClick={handleChange} value={"React"}>React</Button>
              <Button label={"Core"} primary={radioCheck == 'Core'} onClick={handleChange} value={"Core"}>Core</Button>
              <div className={mdxVariantLinkGroup}>
                <a href={`${import.meta.env.VITE_LOCAL_REACT_URI}/?path=/story/atom-input-variant--${variantValue}`} target="_blank">[{radioCheck}]{variantValue}컴포넌트 바로가기</a>
                {/* <a href={`${port}/?path=/story/atom-input-variant--${variantValue}`} target="_blank">[{radioCheck}]{variantValue}컴포넌트 바로가기</a> */}
              </div>
            </div>

            <div>
              <div className={radioCheck == "React" ? `${mdxViewItem}` : `${mdxViewItem} hide`}>
                <MdxCodeBlock title={"tsx"} code={ Reacttsx.default} />
              </div>
              <div className={radioCheck == "Core" ? `${mdxViewItem}` : `${mdxViewItem} hide`}>
                <MdxCodeBlock title={"html"} code={ Corehtml.default} />
                <MdxCodeBlock title={"css"} code={ Corecss.default} />
                <MdxCodeBlock title={"js"} code={ Corejs.default} />
              </div>
            </div>
        </div>
    )
}
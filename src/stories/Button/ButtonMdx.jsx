import React, {useState, Suspense, useEffect} from "react"
import {MdxCodeBlock} from "../../shared/components/Mdx/Mdx.tsx"
import {mdxViewItem, mdxViewStyle, mdxWrapStyle, mdxSwicherGroup, mdxVariantGroup, mdxVariantItem, mdxVariantWrap, mdxVariantLinkGroup} from "../../shared/components/Mdx/Mdx.css"
import Button from "../../../storybook-react/src/stories/Atom/Button/variant/Button.tsx"

import { theme } from "../../shared/assets/style/theme/theme.css.ts"

{/* location of REACT source */}
import * as REACTtsx from "../../../storybook-react/src/stories/Atom/Button/variant/Button.tsx?raw";
{/* location of CORE source */}
import * as COREhtml from "../../../storybook-core/src/stories/Button/button.html?raw";
import * as COREcss from "../../../storybook-core/src/stories/Button/button.css?raw";
import * as COREjs from "../../../storybook-core/src/stories/Button/button.js?raw";
{/* location of VUE source */}
import * as VUEvue from "../../../storybook-vue/src/stories/Atom/Button/variant/Button.vue?raw";

export default function MdxWrap() {
      const [radioCheck, setRadioCheck] = useState('REACT');
      const [port, setPort] = useState("6007");
    const [variantValue, setVariantValue] = useState("default");
    const [fullScreen, setFullScreen] = useState(false);

    const switcher = (target) => {
          switch (target) {
              case "REACT":
              return import.meta.env.VITE_LOCAL_REACT_URI
              case "CORE":
              return import.meta.env.VITE_LOCAL_CORE_URI
              case "VUE":
              return import.meta.env.VITE_LOCAL_VUE_URI
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
            <div className={`${mdxViewStyle} ${fullScreen ? "full" : ""}`}>
              <Button onClick={() => setFullScreen(!fullScreen) }>{fullScreen ? "축소" : "확대"}</Button>
              <iframe
                  className={`${mdxViewItem} ${radioCheck != "REACT" ? 'hide' : ''}`}
                  src={`${import.meta.env.VITE_LOCAL_REACT_URI}/iframe.html?id=atom-button-variant--${variantValue}&viewMode=story&refId=react&globals=`}
                  width="100%"
              ></iframe>
              <iframe
                  className={`${mdxViewItem} ${radioCheck != "CORE" ? 'hide' : ''}`}
                  src={`${import.meta.env.VITE_LOCAL_CORE_URI}/iframe.html?id=atom-button-variant--${variantValue}&viewMode=story&refId=react&globals=`}
                  width="100%"
              ></iframe>
              <iframe
                  className={`${mdxViewItem} ${radioCheck != "VUE" ? 'hide' : ''}`}
                  src={`${import.meta.env.VITE_LOCAL_VUE_URI}/iframe.html?id=atom-button-variant--${variantValue}&viewMode=story&refId=react&globals=`}
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
                    <input type="radio" name="variant" id="icon" onChange={variantChange} value={"icon"}  checked={variantValue == 'icon'}/><label htmlFor="icon">icon</label>
                  </li>  
                </ul>
              </div>
              
            </div>
            <div className={mdxSwicherGroup} >
              <Button variant={radioCheck === "REACT" ? "primary" : ""} onClick={handleChange} value={"REACT"}>REACT</Button>
              <Button variant={radioCheck === "CORE" ? "primary" : ""} onClick={handleChange} value={"CORE"}>CORE</Button>
              <Button variant={radioCheck === "VUE" ? "primary" : ""} onClick={handleChange} value={"VUE"}>VUE</Button>
              <div className={mdxVariantLinkGroup}>
                <a href={`${import.meta.env.VITE_LOCAL_REACT_URI}/?path=/story/atom-button-variant--${variantValue}`} target="_blank">[{radioCheck}]{variantValue}컴포넌트 바로가기</a>
              </div>
            </div>

            <div>
              <div className={radioCheck == "REACT" ? `${mdxViewItem}` : `${mdxViewItem} hide`}>
                <MdxCodeBlock title={"tsx"} code={ REACTtsx.default} />
              </div>
              <div className={radioCheck == "CORE" ? `${mdxViewItem}` : `${mdxViewItem} hide`}>
                <MdxCodeBlock title={"html"} code={ COREhtml.default} />
                <MdxCodeBlock title={"css"} code={ COREcss.default} />
                <MdxCodeBlock title={"js"} code={ COREjs.default} />
              </div>
              <div className={radioCheck == "VUE" ? `${mdxViewItem}` : `${mdxViewItem} hide`}>
                <MdxCodeBlock title={"vue"} code={ VUEvue.default} />
              </div>
            </div>
        </div>
    )
}
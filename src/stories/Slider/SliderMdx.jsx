import React, {useState, Suspense, useEffect} from "react"
import {MdxCodeBlock} from "../../shared/components/Mdx/Mdx.tsx"
import {mdxViewItem, mdxViewStyle, mdxWrapStyle, mdxSwicherGroup, mdxVariantGroup, mdxVariantItem, mdxVariantWrap, mdxVariantLinkGroup} from "../../shared/components/Mdx/Mdx.css"
import Button from "../../../storybook-react/src/stories/Atom/Button/variant/Button.tsx"

import { theme } from "../../shared/assets/style/theme/theme.css.ts"

{/* location of React source */}
{/* location of Core source */}
import * as Corehtml from "../../../storybook-core/src/stories/Slider/slider.html?raw";
import * as Corecss from "../../../storybook-core/src/stories/Slider/slider.css?raw";
import * as Corejs from "../../../storybook-core/src/stories/Slider/slider.js?raw";

export default function MdxWrap() {
    const [radioCheck, setRadioCheck] = useState('React');
    const [port, setPort] = useState("6007");
    const [variantValue, setVariantValue] = useState("default");
    const [fullScreen, setFullScreen] = useState(false);

    const switcher = (target) => {
          switch (target) {
              case "React":
              return 6007
              case "Core":
              return 6006
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
                  className={`${mdxViewItem} ${radioCheck != "React" ? 'hide' : ''}`}
                  src={`http://localhost:6007/iframe.html?id=atom-slider-variant--${variantValue}&viewMode=story&refId=react&globals=`}
                  width="100%"
              ></iframe>
              <iframe
                  className={`${mdxViewItem} ${radioCheck != "Core" ? 'hide' : ''}`}
                  src={`http://localhost:6006/iframe.html?id=atom-slider-variant--${variantValue}&viewMode=story&refId=react&globals=`}
                  width="100%"
              ></iframe>
              
              <div className={mdxVariantGroup}>
                <ul className={mdxVariantWrap}>
                  <li className={`${theme} ${mdxVariantItem}`}>
                    <input type="radio" name="variant" id="default" onChange={variantChange} value={"default"}  checked={variantValue == 'default'}/><label htmlFor="default">default</label>
                  </li>  
                </ul>
              </div>
              
            </div>
            <div className={mdxSwicherGroup} >
              <Button onClick={handleChange} value={"React"}>React</Button>
              <Button onClick={handleChange} value={"Core"}>Core</Button>
              <div className={mdxVariantLinkGroup}>
                <a href={`http://localhost:${port}/?path=/story/atom-slider-variant--${variantValue}`} target="_blank">[{radioCheck}]{variantValue}컴포넌트 바로가기</a>
              </div>
            </div>

            <div>
              <div className={radioCheck == "React" ? `${mdxViewItem}` : `${mdxViewItem} hide`}>
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
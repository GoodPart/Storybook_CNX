import React, {useState, Suspense} from "react"
import {MdxCodeBlock} from "../../shared/components/Mdx/Mdx.tsx"
import {mdxViewItem, mdxViewStyle, mdxWrapStyle, mdxSwicherGroup} from "../../shared/components/Mdx/Mdx.css"
import { Button } from "../../../storybook-react/src/stories/Atom/Button/variant/Button.tsx"


{/* location of React source */}
import * as Reacttsx from "../../../storybook-react/src/stories/Atom/Input/variant/Input.tsx?raw";
{/* location of Core source */}
import * as Corehtml from "../../../storybook-core/src/stories/Input/input.html?raw";
import * as Corecss from "../../../storybook-core/src/stories/Input/input.css?raw";
import * as Corejs from "../../../storybook-core/src/stories/Input/input.js?raw";

export default function MdxWrap() {
    const [radioCheck, setRadioCheck] = useState('React');

    const handleChange = (e)=> {
      const {name, value} = e.target;
      setRadioCheck(value);
    }
    return (
        <div className={mdxWrapStyle}>
            <div className={mdxViewStyle}>
              <iframe
                  className={`${mdxViewItem} ${radioCheck != "React" ? 'hide' : ''}`}
                  src="http://localhost:6007/iframe.html?id=atom-input-variant--default&viewMode=story&refId=react&globals="
                  width="100%"
              ></iframe>
              <iframe
                  className={`${mdxViewItem} ${radioCheck != "Core" ? 'hide' : ''}`}
                  src="http://localhost:6006/iframe.html?id=atom-input-variant--default&viewMode=story&refId=react&globals="
                  width="100%"
              ></iframe>
            </div>
            <div className={mdxSwicherGroup} >
              <Button label={"React"} primary={radioCheck == 'React'} onClick={handleChange} value={"React"}>React</Button>
              <Button label={"Core"} primary={radioCheck == 'Core'} onClick={handleChange} value={"Core"}>Core</Button>
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
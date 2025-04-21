import { recipe } from "@vanilla-extract/recipes"
import { createTheme, style } from "@vanilla-extract/css"

// import Token from "../../../../../../src/shared/design_token/token.json";
import {vars} from "../../../../../../src/assets/style/theme/theme.css";


export const InputCss = recipe({
    base : {
        // content : vars.color.primary,
        padding : '4px 12px',
        borderRadius : "12px",
        borderStyle : "solid",
        borderWidth : "1px",
        selectors : {
            '&:disabled' : {
                borderColor : `${vars.color.disabled}`,
                cursor: "default"
            }
        }
    },
    defaultVariants : {
        themeColor : "default",
        size : "s",
    },
    variants : {
        themeColor : {
            default : {
                borderColor : "#ccc"
            },
            transparent : {
                borderColor : "transparent"                
            },
            primary : {
                borderColor : `${vars.color.primary}`
            },
            warring : {
                borderColor : `${vars.color.warring}`
            }
        },
        size : {
            s : {
                height : '24px'
            },
            m : {
                height : '28px'
            },
            l : {
                height : '32px'
            },
            xl : {
                height : '36px'
            },
        },

    }
})

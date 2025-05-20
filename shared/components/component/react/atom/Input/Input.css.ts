import { recipe } from "@vanilla-extract/recipes"

// import {vars} from "../../../../../../shared/assets/style/theme/theme.css";
import { vars } from "../../../../../assets/style/theme/theme.css"


export const InputCss = recipe({
    base : {
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
                height : `${vars.size.s}`
            },
            m : {
                height : `${vars.size.m}`
            },
            l : {
                height : `${vars.size.l}`
            },
            xl : {
                height : `${vars.size.xl}`
            },
        },

    }
})

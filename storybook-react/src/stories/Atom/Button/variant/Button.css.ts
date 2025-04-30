import { recipe } from "@vanilla-extract/recipes";

import { vars } from "../../../../../../src/shared/assets/style/theme/theme.css";

export const ButtonCss = recipe({
    base : {
        display : "inline-block",
        padding : "0 16px",
        cursor : "pointer",
        border : 0,
        borderRadius : "12px",
        fontWeight : 500,
        lineHeight : 1,
        selectors : {
            "&:disabled" : {
                backgroundColor : `${vars.color.disabled}`,
                cursor : "not-allowed"
            }
        }
    },
    defaultVariants : {
        variant : "default",
        size : "s"
    },
    variants : {
        variant : {
            default : {
                backgroundColor : "#ccc"
            },
            primary : {
                backgroundColor : `${vars.color.primary}`,
                color : "#fff"
            },
            warring : {
                backgroundColor : `${vars.color.warring}`
            },
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
        icon : {
            true : {
                display : "flex",
                alignItems : "center",
                justifyContent : "center",
                paddingTop : "4px",
                paddingBottom : "4px", 
                gap : "4px"
            }
        }
    },
})
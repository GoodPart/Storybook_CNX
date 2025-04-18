import { recipe } from "@vanilla-extract/recipes"



export const InputCss = recipe({
    base : {
        padding : '4px 12px',
        borderRadius : "12px",
        borderStyle : "solid",
        borderWidth : "1px",
        selectors : {
            '&:disabled' : {
                borderColor : '#aaa',
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
                borderColor : "blue"
            },
            warring : {
                borderColor : "#FF4000"
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

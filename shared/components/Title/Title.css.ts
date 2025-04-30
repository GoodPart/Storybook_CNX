import { recipe } from "@vanilla-extract/recipes";

export const title = recipe({
    base : {
        all : 'unset',
        fontFamily : 'inherit',
        fontSize : 'inherit',
    },
    defaultVariants : {
        color : "transparent",
        size : 'm',
        bold : 'medium',
    },
    variants : {
        color : {
            transparent : {backgroundColor : "transparent"},
            primary : {backgroundColor : "blue"},
            secondary : {backgroundColor : "orange"},
            warring : {backgroundColor : "#FF4000"}
        },
        bold : {
            thin : {
                fontWeight : 100,
            },
            regular : {
                fontWeight : 400
            },
            medium : {
                fontWeight : 500
            },
            bold : {
                fontWeight : 700
            },
            heavy :  {
                fontWeight : 900
            } 
        },
        size : {
            s : {
                fontSize : "12px",
                lineHeight : "14px"
            },
            m : {
                fontSize : "16px",
                lineHeight : "18px"
            },
            l : {
                fontSize : "20px",
                lineHeight : "22px"
            },
            xl : {
                fontSize : "26px",
                lineHeight : "30px"
            }
        }
    }
})
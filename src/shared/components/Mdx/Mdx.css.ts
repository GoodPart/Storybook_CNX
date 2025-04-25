import { globalStyle, style } from "@vanilla-extract/css";
import { vars } from "../../assets/style/theme/theme.css";
import { blockParams } from "handlebars";

 const mdxWrapStyle = style({
    position : "relative"
})

const mdxViewStyle = style({
    position : "relative",
    height : "100%",
    border : "1px solid #eee"
})

globalStyle(`${mdxViewStyle}.full`, {
    position: "fixed",
    top : "50%",
    left : "50%",
    transform: "translate(-50%, -50%)",
    width : "100vw",
    height : "100vh",
    zIndex : 100,
    background :"white",
})

const mdxViewItem = style({
    // position : "absolute"
})
globalStyle(`${mdxViewItem}.hide`, {
    display : "none"
})
globalStyle(`iframe.${mdxViewItem}`, {
    border : "none",
    // borderStyle : "solid",
    // borderColor : "#eee",
    boxSizing : "border-box",
    display : "block",
    height : "inherit"
})

const mdxSwicherGroup = style({
    position : "relative",
    margin : "12px 0 !important",
    display : "flex",
    justifyContent : "flex-end",
    gap : "8px"
})


const mdxVariantWrap = style({
    all : 'unset',
    position : "relative",
    padding : 0,
    margin  : 0,
})

const mdxVariantGroup = style({
    overflowY : "auto",
    position : "absolute",
    top : 0,
    right : 0,
    padding : "0 12px",
    backgroundColor : "#ddd",
    height : "inherit"
})

const mdxVariantItem = style({
    listStyle : "none",
    selectors : {
        "&:first-child" : {
        },
        "&:last-child" : {
            paddingBottom : "12px"
        },

    }
})
globalStyle(`${mdxVariantItem} input`, {
    display : "none",
})

globalStyle(`${mdxVariantItem} input + label`, {
    display : "block",
    padding : "4px 12px",
    textAlign : "center"
})

globalStyle(`${mdxVariantItem} input:checked + label`, {
    backgroundColor: vars.color.primary,
    borderRadius : 40,
    color: 'white',
    fontWeight: 'bold',
})

const mdxVariantLinkGroup = style({
    position : "absolute",
    left : 0,
    top : "50%",
    transform : "translateY(-50%)"
})



export {mdxWrapStyle, mdxViewStyle, mdxViewItem, mdxSwicherGroup, mdxVariantItem, mdxVariantWrap,mdxVariantGroup, mdxVariantLinkGroup}




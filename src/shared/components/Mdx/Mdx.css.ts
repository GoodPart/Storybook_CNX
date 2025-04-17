import { globalStyle, style } from "@vanilla-extract/css";

 const mdxWrapStyle = style({
    position : "relative"
})

const mdxViewStyle = style({
    position : "relative",
    // minHeight : "200px",
    height : "100%",
})

const mdxViewItem = style({
    // position : "absolute"
})
globalStyle(`${mdxViewItem}.hide`, {
    display : "none"
})

const mdxSwicherGroup = style({
    display : "flex",
    justifyContent : "flex-end",
    gap : "8px"
})


export {mdxWrapStyle, mdxViewStyle, mdxViewItem, mdxSwicherGroup}




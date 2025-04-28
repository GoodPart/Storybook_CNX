import { createTheme, style } from "@vanilla-extract/css"

import Token from "../../../design_token/token.json";

const defaultValue = 2;
export const [theme, vars] = createTheme({
    color : {
        primary : Token.Color.Primary["Primary-600"].value,
        secondary : Token.Color.Yellow["Yellow-600"].value,
        disabled : Token.Color.Grey["Grey-200"].value,
        warring : Token.Color.Red["Red-600"].value
    },
    size : {
        s : `${Token.Spacing[3].value * defaultValue}px`,
        m : `${Token.Spacing[4].value * defaultValue}px`,
        l : `${Token.Spacing[5].value * defaultValue}px`,
        xl : `${Token.Spacing[6].value * defaultValue}px`,
    }
})


import { createTheme, style } from "@vanilla-extract/css"

import Token from "../../../shared/design_token/token.json";

export const [theme, vars] = createTheme({
    color : {
        primary : Token.Color.Primary["Primary-600"].value,
        secondary : Token.Color.Yellow["Yellow-600"].value,
        disabled : Token.Color.Grey["Grey-600"].value,
        warring : Token.Color.Red["Red-600"].value
    }
})


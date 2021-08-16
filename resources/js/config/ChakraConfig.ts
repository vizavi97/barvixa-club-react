// 1. Import the extendTheme function
import {mode} from '@chakra-ui/theme-tools';
import {extendTheme} from "@chakra-ui/react"

// 2. Extend the theme to include custom colors, fonts, etc

const Block = {
    // The styles all Cards have in common
    baseStyle: (props: any) => ({
        background: mode("#fff", "#131722")(props),
        color: mode("#1c273c", "#fff")(props),
        boxShadow: mode("0px 8px 25px #0508090F", "none")(props)
    }),
    // Two variants: rounded and smooth
    variants: {
        empty: {
            boxShadow: "none"
        },
        base: {
            padding: 0,
        },
        rounded: {
            padding: 6,
        },
        smooth: {
            padding: 6,
            borderRadius: "base",
            boxShadow: "md",
        },
    },
    // The default variant value
    defaultProps: {
        variant: "base",
    },
}

const chakraTheme = extendTheme({
    styles: {
        global: (props: any) => ({
            body: {
                fontFamily: "body",
                color: mode("#000", "#fff")(props),
                bg: mode("#ecf0fa", "#000")(props),
                lineHeight: "base",
            },
        }),
        fonts: {
            heading: "Proxima Nova",
            body: "Proxima Nova",
        },
    },
    components: {
        Block
    },
});


export default chakraTheme
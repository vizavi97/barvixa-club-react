import React from "react"
import {Box, useStyleConfig} from "@chakra-ui/react"

export const Block = (props: any) => {
    const {variant, children, ...rest} = props
    const styles = useStyleConfig("Block", {variant});
    // Pass the computed styles into the `__css` prop
    return <Box __css={styles} {...rest} >{children}</Box>
}
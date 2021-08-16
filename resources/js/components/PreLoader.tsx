import React from 'react'
import {Box, Flex, Progress, Spinner} from "@chakra-ui/react";

interface PreLoaderInterface {
}

export const PreLoader: React.FC<PreLoaderInterface> = () => {


    return (
        <>
            <Box
                w={"100%"}
                h={"100vh"}
                position={"fixed"}
                top={0}
                left={0}
            >
                <Progress
                    isIndeterminate
                    colorScheme={'teal'}
                    size={"xs"}
                />
            </Box>
            <Flex w={"100%"}
                  h={"100vh"}
                  position={"fixed"}
                  top={0}
                  left={0}
                  justifyContent={"center"}
                  alignItems={"center"}
            >
                <Spinner   thickness="4px"
                           speed="0.65s"
                           emptyColor="gray.200"
                           color="teal"
                           size="xl"/>
            </Flex>
        </>
    )
}

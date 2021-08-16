import {Flex} from '@chakra-ui/react';
import React from 'react'
import {Block} from "../../../config/ui/Block";

interface AuthLayoutInterface {
}

export const AuthLayout: React.FC<AuthLayoutInterface> = ({children}) => {
    return (
        <Flex minH={"100vh"} w="100%" justifyContent={'center'} alignItems='center'>
            <Block>
                <Flex
                    maxW={'495px'}
                    w={{base: '100%', md: '495px'}}
                    p={'1.75rem 2rem'}
                    textAlign='center'
                    justifyContent='center'
                    alignItems='center'
                  >
                    {children}
                </Flex>
            </Block>
        </Flex>
    )
};

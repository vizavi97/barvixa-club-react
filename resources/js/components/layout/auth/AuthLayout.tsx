import {Flex, Image} from '@chakra-ui/react';
import React from 'react'
import {Block} from "../../../config/ui/Block";
import logo from "../../../assets/images/logo.png";

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
                    flexDirection={"column"}
                    textAlign='center'
                    justifyContent='center'
                    alignItems='center'
                  >
                    <Flex justifyContent={"center"}>
                        <Image src={logo} w='140px' mb={4}/>
                    </Flex>
                    {children}
                </Flex>
            </Block>
        </Flex>
    )
};

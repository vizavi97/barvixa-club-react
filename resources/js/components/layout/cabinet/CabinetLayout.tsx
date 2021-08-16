import {Box, Flex} from '@chakra-ui/react';
import React  from 'react'
import {Block} from '../../../config/ui/Block';
import {SideBar} from './SideBar';
import TopBar from './TopBar';

export const CabinetLayout: React.FC = ({children}) => {
    return (
        <Flex>
            <Flex
                left='0'
                top='0'
                h='100vh'
                position={"fixed"}
                w={'220px'}
                className={'sidebar'}
                d={{base: 'none', lg: "flex"}}
                zIndex={2}
            >
                <Block w={"100%"}>
                    <SideBar/>
                </Block>
            </Flex>
            <Flex flexDirection={'column'}
                  minH='100vh'
                  flex={1}
                  paddingLeft={{base: '0', lg: "220px"}}
                  position={'relative'}
                  overflowX='hidden'
            >
                <TopBar/>
                <Flex flexDirection={'column'} px={'1.25rem'} py={'1.5rem'}>
                    <Box pt={6}>
                        {children}
                    </Box>
                </Flex>
            </Flex>
        </Flex>
    )
};

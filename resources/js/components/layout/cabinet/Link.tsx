import React from 'react'
import {Box, Text, Link, useColorMode} from '@chakra-ui/react';
import {Link as RouterLink, useHistory} from 'react-router-dom'

interface LinkInterface {
    name: string,
    path: string,
}

export const SideLink: React.FC<LinkInterface> = ({
                                                  children,
                                                  name,
                                                  path
                                              }) => {
    const {colorMode} = useColorMode();
    const history = useHistory()
    const pathname = history.location.pathname;
    const iconColor = colorMode === 'light' ? "#1C273C" : "#fff"

    return (
        <Link as={RouterLink} to={path}
              fontSize='1rem'
              px={'1.25rem'}
              d='flex'
              alignItems='center'
              py='.875rem'
              _hover={{
                  color: '#36AB7E',
                  "& path": {fill: '#36AB7E!important'}
              }}
              sx={{
                  color: pathname === path ? "#36AB7E" : iconColor,
                  "& path": {fill: pathname === path ? "#36AB7E" : iconColor}
              }}
              _focus={{}}
        >
            <Box w={5}>
                {children}
            </Box>
            <Text pl={'1rem'}>{name}</Text>
        </Link>
    )
}

import React, {MouseEventHandler} from 'react'
import {Box, Text, Link, useColorMode} from '@chakra-ui/react';
import {Link as RouterLink} from 'react-router-dom'

interface LinkInterface {
    name: string,
    path: string,
    history_path :string
    onClick: MouseEventHandler<HTMLAnchorElement>
}

export const SideLink: React.FC<LinkInterface> = ({
                                                  children,
                                                  name,
                                                  path,
    history_path,
    onClick
                                              }) => {
    const {colorMode} = useColorMode();
    const iconColor = colorMode === 'light' ? "#1C273C" : "#fff"
    return (
        <Link as={RouterLink} to={path}
              fontSize='1rem'
              px={'1.25rem'}
              d='flex'
              alignItems='center'
              py='.875rem'
              _hover={{
                  color: '#dc1f23',
                  "& path": {fill: '#dc1f23!important'}
              }}
              sx={{
                  color: history_path === path ? "#dc1f23" : iconColor,
                  "& path": {fill: history_path === path ? "#dc1f23" : iconColor}
              }}
              _focus={{}}
              onClick={onClick}
        >
            <Box w={5}>
                {children}
            </Box>
            <Text pl={'1rem'}>{name}</Text>
        </Link>
    )
}

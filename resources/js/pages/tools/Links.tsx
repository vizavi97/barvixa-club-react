import React from 'react'
import {Text, Link, Flex} from '@chakra-ui/react';
import {Link as RouterLink} from "react-router-dom";

interface LinksInterface {
}

export const Links: React.FC<LinksInterface> = () => {


    return (
        <Flex flexDirection='column'>
            <Link as={RouterLink} to={'/'}>
                Кабинет
            </Link>
            <Link as={RouterLink} to={'/invest'}>
                invest
            </Link>
            <Link as={RouterLink} to={'/contacts'}>
                contacts
            </Link>
            <Link as={RouterLink} to={'/wallet'}>
                wallet
            </Link>
            <Link as={RouterLink} to={'/mining'}>
                mining
            </Link>
            <Link as={RouterLink} to={'/stacking'}>
                stacking
            </Link>
            <Link as={RouterLink} to={'/settings'}>
                settings
            </Link>
            <Link as={RouterLink} to={'/register'}>
                Регистрация
            </Link>
            <Link as={RouterLink} to={'/login'}>
                Логин
            </Link>
            <Link as={RouterLink} to={'/restore-password'}>
                Восстановление пароля
            </Link>
            <Link as={RouterLink} to={'/settings'}>
                settings
            </Link>
        </Flex>
    )
}

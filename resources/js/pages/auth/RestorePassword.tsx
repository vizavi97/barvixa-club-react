import {
    Box,
    Text,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Flex,
    Input,
    Button,
    Link
} from '@chakra-ui/react';
import PhoneInput from 'react-phone-input-2'
import {Link as RouterLink} from 'react-router-dom'
import 'react-phone-input-2/lib/style.css'
import React from 'react'

interface RestorePasswordInterface {
}

export const RestorePassword: React.FC<RestorePasswordInterface> = () => {
    return (
        <Box w={'100%'}>
            <Text fontSize='1.5rem'>Сбросить пароль</Text>
            <Tabs my={2}>
                <Flex as={'form'} flexDirection={'column'} pt={4}>
                    <TabList>
                        <Tab flex={1} fontSize={'1.125rem'} _focus={{}} _selected={{borderBottom: "2px solid #36AB7E"}}>Электронная
                            почта</Tab>
                        <Tab flex={1} fontSize={'1.125rem'} _focus={{}}
                             _selected={{borderBottom: "2px solid #36AB7E"}}>Мобильный</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel p={0}>
                            <Box textAlign={'left'} py={5}>
                                <Text fontSize={'14px'} fontWeight={300} pb={1}>Электронная почта</Text>
                                <Input
                                    border='1px solid rgba(255, 255, 255, 0.1)'
                                    placeholder="example@mail.ru"
                                    type='text'
                                    h='49px'
                                    _focus={{
                                        border: "1px solid #36AB7E"
                                    }}
                                />
                            </Box>
                        </TabPanel>
                        <TabPanel p={0}>
                            <Box textAlign={'left'} py={5}>
                                <Text fontSize={'14px'} fontWeight={300} pb={1}>Телефон</Text>
                                <PhoneInput
                                    country={'uz'}
                                />
                            </Box>
                        </TabPanel>

                    </TabPanels>
                    <Box mt={4}>
                        <Button w={'100%'} h={'52px'} bg={'#36AB7E'} _hover={{bg: '#36AB7E70'}}>
                            <Text>Далеее</Text>
                        </Button>
                        <Flex justifyContent={"center"} pt={4}>
                            <Link as={RouterLink} to='/' color='#36AB7E'>Войти</Link>
                        </Flex>
                    </Box>
                </Flex>
            </Tabs>
        </Box>
    )
};

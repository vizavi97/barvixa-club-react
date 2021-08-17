import {
    Box,
    Button,
    Text,
    Avatar,
    Flex,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Switch,
    useColorMode,
    useDisclosure,
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    DrawerBody,
    DrawerFooter,
    DrawerCloseButton, Image
} from '@chakra-ui/react';
import {SunIcon, MoonIcon, ChevronDownIcon} from '@chakra-ui/icons'
import React from 'react'
import {Block} from "../../../config/ui/Block";
import {RouterLinks} from "./RouterLinks";
import {withRouter} from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {logOutUser} from "../../../store/actions/user.action";

interface TopBarInterface {
    history: any
}

const TopBar: React.FC<TopBarInterface> = ({history}) => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    history.listen(() => onClose());
    const {colorMode, toggleColorMode} = useColorMode();
    const dispatch = useDispatch();

    return (
        <>
            <Block>
                <Flex w={'100%'}
                      alignItems='center'
                      justifyContent={"flex-end"}
                      h='80px'
                      p={'1.25rem'}
                >
                    {/*mobile open menu btn*/}
                    <Flex mr={4} d={{lg: 'none'}} flex={1}>
                        <Button onClick={onOpen}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="16" viewBox="0 0 24 16">
                                <g id="Гамбургер_меню" data-name="Гамбургер меню" transform="translate(-16 -29)">
                                    <rect id="Линия" width="24" height="2" rx="1" transform="translate(16 29)"
                                          fill={colorMode === 'dark' ? "#fff" : '#6a7187'}/>
                                    <rect id="Линия-2" data-name="Линия" width="15" height="2" rx="1"
                                          transform="translate(16 36)"
                                          fill={colorMode === 'dark' ? "#fff" : '#6a7187'}/>
                                    <rect id="Линия-3" data-name="Линия" width="24" height="2" rx="1"
                                          transform="translate(16 43)"
                                          fill={colorMode === 'dark' ? "#fff" : '#6a7187'}/>
                                </g>
                            </svg>
                        </Button>
                    </Flex>
                    {/*end*/}
                    <Flex alignItems='center' pl={4}>
                        <Switch colorScheme={'teal'} onChange={() => toggleColorMode()} size="lg"/>
                        <Box px={4}>
                            {colorMode === 'dark' ? <MoonIcon color='#fff'/> : <SunIcon color='#6a7187'/>}
                        </Box>
                        <Menu placement={"bottom-start"}>
                            {({isOpen}) => (
                                <>
                                    <MenuButton isActive={isOpen} as={Button}
                                                h={{base: '46px', md: "auto"}}
                                                w={{base: '46px', md: "auto"}}
                                                borderRadius={{base: '50%', md: '.25rem'}}
                                                px={{base: 0, md: 4}}
                                                py={{base: 0, md: 1}}
                                                rightIcon={<ChevronDownIcon d={{base: "none", md: "block"}}/>}>
                                        <Flex alignItems={'center'}>
                                            <Avatar h={{base: '48px', md: "42px"}} w={{base: '48px', md: "42px"}}
                                                    mr={{base: "0", md: '1.125rem'}} name="Dan Abrahmov"
                                                    src="https://bit.ly/dan-abramov"/>
                                        </Flex>
                                    </MenuButton>
                                    <MenuList right={0}>
                                        <MenuItem onClick={() => dispatch(logOutUser())}>Выйти</MenuItem>
                                    </MenuList>
                                </>
                            )}
                        </Menu>
                    </Flex>
                </Flex>
            </Block>
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
            >
                <DrawerOverlay/>
                <DrawerContent
                    bg={colorMode === 'light' ? "white" : "#131722"}
                    color={colorMode === 'light' ? "#1c273c" : "white"}>
                    <DrawerCloseButton/>
                    <DrawerHeader><Image src={logo} w={"90px"}/></DrawerHeader>

                    <DrawerBody px={0}>
                        <RouterLinks/>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant="outline" mr={3} onClick={onClose}>
                            Скрыть боковое меню
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
};


export default withRouter(TopBar)

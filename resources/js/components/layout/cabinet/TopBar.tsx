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
    DrawerCloseButton, Link
} from '@chakra-ui/react';
import {SunIcon, MoonIcon, ChevronDownIcon} from '@chakra-ui/icons'
import React from 'react'
import {Search} from "./Search";
import {Block} from "../../../config/ui/Block";
import {RouterLinks} from "./RouterLinks";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {logOutUser} from "../../../store/actions/user.action";
import {Link as RouterLink} from "react-router-dom";

interface TopBarInterface {
}

export const TopBar: React.FC<TopBarInterface> = () => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const {user} = useSelector((state: RootStateOrAny) => state.user)
    const dispatch = useDispatch()
    const {colorMode, toggleColorMode} = useColorMode();
    return (
        <>
            <Block>
                <Flex w={'100%'}
                      alignItems='center'
                      justifyContent={"space-between"}
                      h='80px'
                      p={'1.25rem'}
                >
                    {/*mobile open menu btn*/}
                    <Button onClick={onOpen} mr={4} d={{md: 'none'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="16" viewBox="0 0 24 16">
                            <g id="Гамбургер_меню" data-name="Гамбургер меню" transform="translate(-16 -29)">
                                <rect id="Линия" width="24" height="2" rx="1" transform="translate(16 29)"
                                      fill={colorMode === 'dark' ? "#fff" : '#6a7187'}/>
                                <rect id="Линия-2" data-name="Линия" width="15" height="2" rx="1"
                                      transform="translate(16 36)" fill={colorMode === 'dark' ? "#fff" : '#6a7187'}/>
                                <rect id="Линия-3" data-name="Линия" width="24" height="2" rx="1"
                                      transform="translate(16 43)" fill={colorMode === 'dark' ? "#fff" : '#6a7187'}/>
                            </g>
                        </svg>
                    </Button>
                    {/*end*/}
                    <Block flex={1} variant={'empty'}>
                        <Search/>
                    </Block>
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
                                            <Text d={{base: 'none', md: 'block'}}>{user.name}</Text>
                                        </Flex>
                                    </MenuButton>
                                    <MenuList right={0}>
                                        <MenuItem>
                                            <Link as={RouterLink} to={'/settings'} textAlign={"left"}>Настройки</Link>
                                        </MenuItem>
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
                    <DrawerHeader>Create your account</DrawerHeader>

                    <DrawerBody px={0}>
                        <RouterLinks/>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant="outline" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
};

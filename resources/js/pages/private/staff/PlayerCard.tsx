import React from 'react'
import {Block} from "../../../config/ui/Block";
import {Box, Button, Flex, GridItem, Image, Text} from "@chakra-ui/react";
import {useDispatch} from "react-redux";
import {deletePlayer} from "../../../store/actions/player.action";

export interface PlayerCardInterface {
    icon: string,
    name: string,
    surname: string,
    number: number | string,
    position: string,
    id: number | string
}

export const PlayerCard: React.FC<PlayerCardInterface> = ({
                                                              icon,
                                                              name,
                                                              surname,
                                                              number,
                                                              position,
                                                              id
                                                          }) => {
    const dispatch = useDispatch();
    return (
        <>
            <GridItem colSpan={1}>
                <Block p={2} h={"100%"} variant={'rounded'} _hover={{boxShadow: "0 0 13px 1px #11111130", transform: "translateY(-.375rem)"}}
                       transition={'all .3s ease'}>
                    <Flex flexDirection={"column"} justifyContent={"center"} textAlign={'center'}>
                        <Image src={icon} title={name + " " + surname} objectFit={"cover"} objectPosition={"top"}
                               h={'100%'} maxH={"240px"} minH={"240px"}/>
                        <Box p={4}>
                            <Text as={'h3'} fontWeight={700}>{name + " " + surname}</Text>
                            <Text>Игровой номер: <Text as={'span'} color={'red.500'} fontWeight={700}
                                                       fontSize={"1.125rem"}>{number}</Text></Text>
                            <Text>Позиция: {position}</Text>
                        </Box>
                        <Flex justifyContent={"center"} pb={4}>
                            <Button colorScheme='red'
                                    mx={2}
                                    onClick={() => dispatch(deletePlayer(id))}
                            >
                                Удалить
                            </Button>
                        </Flex>
                    </Flex>
                </Block>
            </GridItem>
        </>
    )
}

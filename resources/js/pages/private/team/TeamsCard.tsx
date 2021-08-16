import React from 'react'
import {Block} from "../../../config/ui/Block";
import {Box, Button, Flex, GridItem, Image, Text} from "@chakra-ui/react";
import {deletePlayer} from "../../../store/actions/player.action";
import {useDispatch} from "react-redux";
import {deleteTeam} from "../../../store/actions/team.action";

export interface TeamsCardInterface {
    img: string | number | any,
    name: string,
    id: number | string
}

export const TeamsCard: React.FC<TeamsCardInterface> = ({
                                                            id,
                                                            img,
                                                            name,
                                                        }) => {
    const dispatch = useDispatch();
    return (
        <>
            <GridItem colSpan={1}>
                <Box p={2} variant={'rounded'}
                     _hover={{boxShadow: "0 0 13px 1px #11111130", transform: "translateY(-.375rem)"}}
                     transition={'all .3s ease'}>
                    <Flex flexDirection={"column"} justifyContent={"center"} textAlign={'center'}>
                        <Image src={img} title={name} objectFit={"cover"} objectPosition={"top"}
                               h={'100%'} maxH={"360px"}/>
                        <Box p={4}>
                            <Text as={'h3'} fontWeight={700}>{name}</Text>
                        </Box>
                        <Flex justifyContent={"center"} pb={4}>
                            <Button colorScheme='red'
                                    onClick={() => dispatch(deleteTeam(id))}
                                    mx={2}>
                                Удалить
                            </Button>
                        </Flex>
                    </Flex>
                </Box>
            </GridItem>
        </>
    )
}

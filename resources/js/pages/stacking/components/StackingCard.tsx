import React from 'react'
import {Block} from "../../../config/ui/Block";
import {Box, Button, Flex, GridItem, Image, Text} from "@chakra-ui/react";
import {ImageFromBackendInterface} from "../../../interfaces/backend";

export interface StackingCardInterface {
    preview_img: ImageFromBackendInterface | null,
    name: string,
    profit: string,
    min_attachment: number
    type: string
}

export const StackingCard: React.FC<StackingCardInterface> = ({
                                                                  preview_img,
                                                                  name,
                                                                  profit,
                                                                  min_attachment,
                                                                  type
                                                              }) => {
    return (
        <GridItem colSpan={1}>
            <Block p={'1.375rem'}>
                <Flex alignItems={'center'}>
                        <Box w='46px' h="46px" mr={'1.0625rem'}>
                            <Image src={preview_img?.path} title={name}/>
                        </Box>
                    <Box>
                        <Text fontWeight={700}>{name}</Text>
                    </Box>
                </Flex>
                <Box pt={'1.125rem'} pb='1.625rem'>
                    <Flex justifyContent={"space-between"} pb='.75rem'>
                        <Text color={'#BEC4DF'} fontSize={'0.875rem'}>Среднегодовая доходность:</Text>
                        <Text color={"#36AB7E"} fontSize={'1.125rem'}>{profit}</Text>
                    </Flex>
                    <Flex justifyContent={"space-between"}>
                        <Text color={'#BEC4DF'} fontSize={'0.875rem'}>Минимальная сумма накоплений:</Text>
                        <Text fontSize={'1.125rem'}>{min_attachment} - {type}</Text>
                    </Flex>
                </Box>
                <Box>
                    <Button
                        h={'40px'}
                        w={'110px'}
                        bg={'#36AB7E'}
                        fontSize={'.875rem'}
                        fontWeight={600}
                        color={'white'}
                    >
                        Пополнить
                    </Button>
                    <Button
                        h={'40px'}
                        w={'110px'}
                        color={'white'}
                        bg={'#1F232D'}
                        fontSize={'.875rem'}
                        fontWeight={600}
                        ml={'1rem'}
                    >
                        Купить
                    </Button>

                </Box>
            </Block>
        </GridItem>
    )
}

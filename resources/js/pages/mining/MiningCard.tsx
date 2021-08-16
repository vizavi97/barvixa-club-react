import React, {useState} from 'react'
import {Block} from "../../config/ui/Block";
import {
    Box,
    Button,
    Divider,
    Flex,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
    Text,
    Image,
    Tooltip, useColorMode
} from "@chakra-ui/react";
import {ImageFromBackendInterface} from "../../interfaces/backend";

export interface MiningCardInterface {
    name: string
    base_invest_value: number
    base_profit_value: number
    is_active: boolean | number
    preview_img: ImageFromBackendInterface | null
    type: string
    v_energy_count: number
    daily_cost: number
}

export const MiningCard: React.FC<MiningCardInterface> = ({
    name,
                                                              base_invest_value,
                                                              base_profit_value,
                                                              is_active,
                                                              preview_img,
                                                              type,
                                                              v_energy_count,
                                                              daily_cost,
                                                          }) => {
    const disable = !Boolean(is_active)
    const [sliderValue] = useState<number>(10)
    const [hash, setHash] = useState<number>(v_energy_count)
    const [packages, setPackages] = useState<number>(base_invest_value)
    const [profit, setProfit] = useState<number>(base_profit_value)

    const sliderChangeHandler = (value: number) => {
        setHash(() => v_energy_count * value)
        setPackages(() =>  base_invest_value * value)
        setProfit(() => base_profit_value * value)
    }

    const {colorMode} = useColorMode()

    return (
        <>
            <Block borderRadius='.375rem' overflow='hidden'>
                <Flex alignItems={"center"} bg={colorMode === 'light' ? "#f5faff" : "#1f232d"} p='1.375rem 1.125rem'>
                    <Image src={preview_img?.path} w={'52px'} h={'52px'} borderRadius={"50%"}/>
                    <Text color='#36AB7E' fontWeight={700} pl={4}>
                        {name}
                    </Text>
                </Flex>
                <Box p='1.375rem 1.125rem'>
                    <Text as='h6' color='#A2ABCA'>
                        <Text as='span' color='#36AB7E' fontWeight={700}
                              fontSize="1.5rem" pr={4}>{base_invest_value}</Text>
                        за
                        <Text as='span' color='#36AB7E' fontWeight={700}
                              fontSize="1.5rem" pl={4}>1 V-ENERGY</Text>
                    </Text>
                    <Text color='#A2ABCA'>Плата за обслуживание в сутки {daily_cost}</Text>
                    <Divider my='1.125rem'/>
                    <Text>Инвестиции</Text>
                    <Text color='#36AB7E' fontWeight={600}
                          fontSize="1.125rem">$ {packages} | {profit.toFixed(6)} {type} </Text>
                    <Slider my={4} aria-label="slider-ex-1"
                            defaultValue={sliderValue} min={10} max={100} step={10}
                            onChange={sliderChangeHandler}
                            isDisabled={disable}
                    >
                        <SliderTrack bg={colorMode === 'light' ? "#1f232d" : "#fff"}>
                            <SliderFilledTrack bg="#36AB7E"/>
                        </SliderTrack>
                        <SliderThumb boxSize={4} bg={colorMode === 'light' ? "#1f232d" : "#36AB7E"}/>
                    </Slider>
                    <Text color='#36AB7E' fontWeight={700} fontSize="1.25rem">
                        {hash} V-ENERGY
                    </Text>
                    <Text fontSize=".875rem" color="#A2ABCA">
                        Последний доход
                    </Text>
                    <Text mt={4} color='#36AB7E' fontWeight={700} fontSize="0.875rem">
                        {profit.toFixed(6)}
                    </Text>
                    <Text fontSize=".875rem" color="#A2ABCA">
                        {type} Доход за день
                    </Text>
                    <Button isDisabled={disable} bg={'#36AB7E'} mt={6} color={'white'} w="100%">
                        {disable ? "Не доступно" : "Приобрести"}
                    </Button>
                </Box>
            </Block>

        </>
    )
}

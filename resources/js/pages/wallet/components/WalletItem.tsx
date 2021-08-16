import React from 'react'

import {Box, Flex, Grid, GridItem, Image, Text, useColorMode} from '@chakra-ui/react';
import {Block} from "../../../config/ui/Block";
import image from '../../../assets/images/icons/wallet/Bitcoin.svg'

import Highcharts from 'highcharts'
import HighchartsReact from "highcharts-react-official";


export interface WalletItemInterface {
    name: string,
    short_name: string,
    value: string,
    value_on_usd: string,
    one_crypto_cost: string,
    change: string,
    color: string,
    data_for_chart: number[],
    image?: string
}

export const WalletItem: React.FC<WalletItemInterface> = ({
                                                              name, short_name,
                                                              value,
                                                              value_on_usd,
                                                              one_crypto_cost,
                                                              change,
                                                              color,
                                                              data_for_chart,
    image
                                                          }) => {

        const {colorMode} = useColorMode()
        const options = {
            chart: {
                type: 'area',
                height: 50,
                margin: [5, 0, 5, 0],
                backgroundColor: 'transparent',
            },
            tooltip: {enabled: false},
            credits: {enabled: false},
            title: {
                style: {display: 'none'}
            },

            xAxis: {
                lineWidth: 0,
                minorGridLineWidth: 0,
                lineColor: 'transparent',
                labels: {
                    enabled: false
                },
                minorTickLength: 0,
                tickLength: 0
            },
            yAxis: {
                title: {text: false},
                gridLineWidth: 0,
                labels: {enabled: false},
            },

            legend: {enabled: false},

            series: [
                {
                    data: data_for_chart,
                    color: color,
                }
            ],

            plotOptions: {
                series: {
                    fillColor: `${color + "05"}`,
                },
                area: {
                    marker: {
                        radius: 2
                    }
                }
            },
        }


        return (
            <Block py={4} px={5} borderRadius={'6px'} mb={5} _hover={{
                boxShadow: "none",
                background: colorMode === "dark" ? '#1F232D' : 'white'
            }}>
                <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                    <GridItem colSpan={{base: 2, md: 1}}>
                        <Flex w={'100%'} alignItems={'center'}>
                            <Image bg={color} borderRadius="full"
                                   w={'42px'} h={'42px'} p={2}
                                   src={image} alt={name}/>
                            <Box pl={3}>
                                <Text fontWeight='600'>{name}</Text>
                                <Text color={'#A2ABCA'} fontSize='.875rem'>{short_name}</Text>
                            </Box>
                        </Flex>
                    </GridItem>
                    <GridItem colSpan={{base: 2, md: 1}}>
                        <Text fontWeight='600'>{value}</Text>
                        <Text color={'#A2ABCA'} fontSize='.875rem'>{value_on_usd}</Text>
                    </GridItem>
                    <GridItem colSpan={{base: 2, md: 1}}>
                        <Text fontWeight='600'>
                            <Text as={'span'} color={color}>1.00 {short_name}</Text> = {one_crypto_cost}
                        </Text>
                        <Text color={'#A2ABCA'} fontSize='.875rem'>{change}</Text>

                    </GridItem>
                    <GridItem colSpan={{base: 2, md: 1}}>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={options}
                        />
                    </GridItem>
                </Grid>
            </Block>

        )
    }
;

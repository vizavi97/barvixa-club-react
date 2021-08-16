import {Box, Flex, Text, Grid, GridItem, Image, Avatar, Button, useColorMode} from '@chakra-ui/react';
import React from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from "highcharts-react-official";

import investImage from '../../assets/images/invest/Clip.svg'
import {Block} from "../../config/ui/Block";

const options = (color: string = "#7e8086", fillColor: string = "#1f232d") => ({
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
            data: [33, 53, 85, 41, 44, 65],
            color: color,
        }
    ],

    plotOptions: {
        series: {
            fillColor: fillColor,
        },
        area: {
            marker: {
                radius: 2
            }
        }
    },
});
const optionsSpline = (color: string = "#7e8086", fillColor: string = "#1f232d") => ({
    chart: {
        type: 'spline',
        height: 320,
        margin: [5, 0, 5, 0],
        backgroundColor: 'transparent',
    },
    tooltip: {enabled: false},
    credits: {enabled: false},
    title: {
        style: {display: 'none'}
    },

    legend: {enabled: false},

    yAxis: {
        labels: {
            format: '{value}°'
        },
        accessibility: {
            rangeDescription: 'Range: -90°C to 20°C.'
        },
        gridLineColor: '#77777760',
        gridLineWidth: 1,
    },
    series: [
        {
            data: [[0, 15], [10, -50], [20, -56.5], [30, -46.5], [40, -22.1],
                [50, -2.5], [60, -27.7], [70, -55.7], [80, -76.5]],
            color: color,
        }
    ],

    plotOptions: {
        series: {
            fillColor: fillColor,
        },
        area: {
            marker: {
                radius: 2
            }
        }
    },
});

interface InvestInterface {
}


export const Invest: React.FC<InvestInterface> = () => {
    const {colorMode} = useColorMode()

    return (
        <>
            <Grid
                gridTemplateColumns={{
                    base: "repeat(1, 1fr)",
                    lg: "repeat(6, 1fr)",
                }}
                gridTemplateRows={{
                    base: "repeat(1, 1fr)",
                }}
                templateAreas={{
                    base: `
                            'wallet1 '
                            'wallet2' 
                            'wallet3' 
                            'profile'
                            'chart'
                    `,
                    lg: `'wallet1 wallet1 wallet2 wallet2 wallet3 wallet3' 'chart chart chart profile profile profile'`,

                }}
                justifyContent={'center'}
                alignItems={"center"}
                gap={6}>
                <GridItem gridArea='wallet1'>
                    <Block borderRadius='6px'>
                        <Box p={5}>
                            <Text fontWeight={700} fontSize={'1.125rem'}>Общий Баланс</Text>
                            <Flex pt={6} alignItems='center'>
                                <Flex flexDirection={'column'} flex={1}>
                                    <Text fontWeight={600} fontSize={"1.5rem"}>$334,252</Text>
                                </Flex>
                                <Flex flex={1}>
                                    <Flex justifyContent={'center'} alignItems='center' borderRadius='50%'
                                          transform='rotate(180deg)' w={"20px"} h={"20px"}
                                          mr={2}
                                          fontSize='1.25rem' bg='white' color={'#f93e5d'}>
                                        ↑
                                    </Flex>
                                    <Text color={'#BEC4DF'}>-23.09%</Text>
                                </Flex>
                            </Flex>
                            <Text color='#BEC4DF'>
                                From previous period
                            </Text>
                        </Box>
                        <HighchartsReact style={{display: "flex", justifyContent: "flex-end"}}
                                         highcharts={Highcharts}
                                         options={options(
                                             colorMode === 'light' ? "#d8dade" : "#898b91",
                                             colorMode === 'light' ? "#ecf0fa" : "#1C273C")
                                         }/>

                    </Block>
                </GridItem>
                <GridItem gridArea='wallet2'>
                    <Block borderRadius='6px'>
                        <Box p={5}>
                            <Text fontWeight={700} fontSize={'1.125rem'}>Начисления</Text>
                            <Flex pt={6} alignItems='center'>
                                <Flex flexDirection={'column'} flex={1}>
                                    <Text fontWeight={600} fontSize={"1.5rem"}>$334,252</Text>
                                </Flex>
                                <Flex flex={1}>
                                    <Flex justifyContent={'center'} alignItems='center' borderRadius='50%'
                                          transform='rotate(180deg)' w={"20px"} h={"20px"}
                                          mr={2}
                                          fontSize='1.25rem' bg='white' color={'#f93e5d'}>
                                        ↑
                                    </Flex>
                                    <Text color={'#BEC4DF'}>-23.09%</Text>
                                </Flex>
                            </Flex>
                            <Text color='#BEC4DF'>
                                From previous period
                            </Text>
                        </Box>
                        <HighchartsReact style={{display: "flex", justifyContent: "flex-end"}}
                                         highcharts={Highcharts}
                                         options={options(
                                             colorMode === 'light' ? "#d8dade" : "#898b91",
                                             colorMode === 'light' ? "#ecf0fa" : "#1C273C")
                                         }/>

                    </Block>
                </GridItem>
                <GridItem gridArea='wallet3'>
                    <Block borderRadius='6px'>
                        <Box p={5}>
                            <Text fontWeight={700} fontSize={'1.125rem'}>Инвестированно</Text>
                            <Flex pt={6} alignItems='center'>
                                <Flex flexDirection={'column'} flex={1}>
                                    <Text fontWeight={600} fontSize={"1.5rem"}>$334,252</Text>
                                </Flex>
                                <Flex flex={1}>
                                    <Flex justifyContent={'center'} alignItems='center' borderRadius='50%'
                                          transform='rotate(180deg)' w={"20px"} h={"20px"}
                                          mr={2}
                                          fontSize='1.25rem' bg='white' color={'#f93e5d'}>
                                        ↑
                                    </Flex>
                                    <Text color={'#BEC4DF'}>-23.09%</Text>
                                </Flex>
                            </Flex>
                            <Text color='#BEC4DF'>
                                From previous period
                            </Text>
                        </Box>
                        <HighchartsReact style={{display: "flex", justifyContent: "flex-end"}}
                                         highcharts={Highcharts}
                                         options={options(
                                             colorMode === 'light' ? "#d8dade" : "#898b91",
                                             colorMode === 'light' ? "#ecf0fa" : "#1C273C")
                                         }/>

                    </Block>
                </GridItem>
                <GridItem gridArea='chart'>
                    <Block p={5} borderRadius='6px' h={'100%'}>
                        <Text fontWeight={700} fontSize={'1.125rem'}>Earning</Text>
                        <HighchartsReact
                            highcharts={Highcharts}
                            options={optionsSpline(
                                colorMode === 'light' ? "#36ab7e" : "#36ab7e",
                                colorMode === 'light' ? "#ecf0fa" : "#1C273C")}/>
                    </Block>
                </GridItem>
                <GridItem gridArea='profile'>
                    <Block borderRadius='6px'>
                        <Flex overflow={'hidden'} h={"97px"} px={5} pt={5}

                              bg={colorMode === 'light' ? "#f1f1f1" : "#1f232d "} position={'relative'}
                              alignItems={'center'}
                              justifyContent='flex-end'>
                            <Box position={'absolute'} left={5} pb={6}>
                                <Text color={'#36AB7E'} fontSize='1.125rem' fontWeight='700'>Welcome Back !</Text>
                                <Text color={'#36AB7E'} fontSize='.875rem'>Skote Dashboard</Text>
                            </Box>
                            <Image src={investImage} pb={5}/>

                        </Flex>
                        <Flex flexDirection={'column'} position={'relative'} px={5} pb={5}>
                            <Flex justifyContent={'flex-end'} w={'100%'}>
                                <Avatar position={'absolute'} left={5} top={-3} w='89px' h="89px"
                                        name="Segun Adebayo" src="https://bit.ly/sage-adebayo"/>
                                <Flex pt={'2rem'}>
                                    <Flex flexDirection={'column'} pr={'4.5rem'}>
                                        <Text fontWeight={600} fontSize={"1.5rem"}>463</Text>
                                        <Text color={'#BEC4DF'}>Projects</Text>
                                    </Flex>
                                    <Flex flexDirection={'column'} pr={'4.5rem'}>
                                        <Text fontWeight={600} fontSize={"1.5rem"}>$1245</Text>
                                        <Text color={'#BEC4DF'}>Revenue</Text>
                                    </Flex>
                                </Flex>
                            </Flex>
                            <Flex alignItems={'center'} pt={'2.5rem'}>
                                <Flex flexDirection={'column'} pr={'4.5rem'}>
                                    <Text fontWeight={600} fontSize={"1.5rem"} color={'#BEC4DF'}>Henry Price</Text>
                                    <Text color={'#A2ABCA'}>UI/UX Designer</Text>
                                </Flex>
                                <Button bg={'#36AB7E'} color={'white'}>
                                    View Profile
                                </Button>
                            </Flex>
                            <Text pt={'3.5rem'} color='#A2ABCA' fontWeight={300}>
                                We craft digital, graphic and dimensional thinking.
                            </Text>
                        </Flex>
                    </Block>
                </GridItem>
            </Grid>
        </>
    )
};

import React, {ChangeEvent, useState} from 'react'
import {Block} from "../../config/ui/Block";
import {Button, Flex, Input, Image, Text, Menu, MenuButton, MenuList, MenuItem} from "@chakra-ui/react";
import exchangeLogo from '../../assets/images/exchange.png'
import {ChevronDownIcon} from "@chakra-ui/icons";


interface ExchangeInterface {
}

const rates = [
    {
        name: "BTC",
        icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1024px-Bitcoin.svg.png",
        rates: 31861.80
    },
    {
        name: "ETH",
        icon: "https://www.pngitem.com/pimgs/m/124-1245793_ethereum-eth-icon-ethereum-png-transparent-png.png",
        rates: 1987.40
    }
] as ExchangeRatesInterface[]

interface ExchangeRatesInterface {
    name: string
    icon: string
    rates: number
}


export const Exchange: React.FC<ExchangeInterface> = () => {
    const [crypto] = useState<ExchangeRatesInterface[] | []>(rates)
    const [activeCrypto, setActiveCrypto] = useState<ExchangeRatesInterface>(rates[0])
    const [activeToCrypto, setActiveToCrypto] = useState<ExchangeRatesInterface>(crypto.filter(item => item.rates !== activeCrypto?.rates)[0])
    const [reverse, setReverse] = useState<boolean>(false)
    const [valueLeft, setValueLeft] = useState<number>(0)
    const [valueRight, setValueRight] = useState<number>(0)


    const inputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        if (!reverse) {
            setValueLeft(() => +event.target.value)
            setValueRight(() => +event.target.value * activeCrypto.rates / activeToCrypto.rates)
        } else {
            setValueLeft(() => +event.target.value * activeToCrypto.rates / activeCrypto.rates)
            setValueRight(() => Number(event.target.value))
        }
    }
    const changeHandler = (valueL:number, valueR:number) => {
        const diff = valueL / valueR
        console.log(diff)
        if (!reverse) {
            setValueRight(() => +valueLeft  * diff)
        } else {
            setValueLeft(() =>  +valueRight / diff)
        }
    }

    return (
        <>
            <Block py={10}>
                <Flex alignItems={"stretch"} justifyContent={"center"} flexDirection={reverse ? "row-reverse" : "row"}>
                    <Block mx={2}>
                        <Flex
                            h={"100%"}
                            alignItems={"stretch"}>
                            <Input
                                mr={4}
                                h={"100%"}
                                placeholder={"123"}
                                isDisabled={reverse}
                                type={"number"}
                                value={valueLeft}
                                onChange={inputHandler}
                                min={0}
                            />
                            <Menu>
                                {({isOpen}) => (
                                    <>
                                        <MenuButton isActive={isOpen}
                                                    as={Button}
                                                    rightIcon={<ChevronDownIcon/>}
                                                    h={"100%"}
                                        >
                                            <Flex
                                                flexDirection={"row"}
                                                alignItems={"center"}>
                                                <Image src={activeCrypto?.icon} w={"32px"} h={"auto"} mr={2}/>
                                                <Text mr={10}>{activeCrypto?.name}</Text>
                                            </Flex>
                                        </MenuButton>
                                        <MenuList>{
                                            crypto.filter(item => item.rates !== activeCrypto?.rates).map((i, key: number) =>
                                                <MenuItem key={key}
                                                          onClick={() => {
                                                              setActiveCrypto(() => crypto.filter(item => item.rates === i.rates)[0])
                                                              changeHandler(i.rates,activeToCrypto.rates)
                                                          }}>
                                                    <Flex
                                                        flexDirection={"row"}
                                                        alignItems={"center"}
                                                    >
                                                        <Image src={i.icon} w={"32px"} h={"auto"} mr={2}
                                                               borderRadius={"50%"}/>
                                                        <Text mr={10}>{i.name}</Text>
                                                    </Flex>
                                                </MenuItem>
                                            )}
                                        </MenuList>
                                    </>
                                )}
                            </Menu>
                        </Flex>
                    </Block>
                    <Button mx={2} py={"1.5rem"}
                            onClick={() => setReverse((prev) => !prev)}
                    >
                        <Image src={exchangeLogo} w={"1.5rem"}
                               sx={{transform: reverse ? "rotate(180deg)" : "rotate(0)", transition: "all.3s ease"}}/>
                    </Button>
                    <Block mx={2}>
                        <Flex
                            h={"100%"}
                            alignItems={"stretch"}>
                            <Input
                                mr={4}
                                h={"100%"}
                                placeholder={"123"}
                                type={"number"}
                                isDisabled={!reverse}
                                value={valueRight}
                                onChange={inputHandler}
                                min={0}
                            />
                            <Menu>
                                {({isOpen}) => (
                                    <>
                                        <MenuButton isActive={isOpen}
                                                    as={Button}
                                                    rightIcon={<ChevronDownIcon/>}
                                                    h={"100%"}
                                        >
                                            <Flex
                                                flexDirection={"row"}
                                                alignItems={"center"}>
                                                <Image
                                                    src={activeToCrypto?.icon}
                                                    borderRadius={"50%"} w={"32px"} h={"auto"} mr={2}/>
                                                <Text
                                                    mr={10}>{activeToCrypto?.name}</Text>
                                            </Flex>
                                        </MenuButton>
                                        <MenuList>
                                            <MenuList>
                                                {crypto.filter(item => item.rates !== activeToCrypto?.rates).map((i, key: number) =>
                                                    <MenuItem key={key}
                                                              onClick={() => {
                                                                  setActiveToCrypto(() => crypto.filter(item => item.rates === i.rates)[0])
                                                                  changeHandler(activeCrypto.rates, i.rates)
                                                              }}>
                                                        <Flex
                                                            flexDirection={"row"}
                                                            alignItems={"center"}
                                                        >
                                                            <Image src={i.icon} w={"32px"} h={"auto"} mr={2}
                                                                   borderRadius={"50%"}/>
                                                            <Text mr={10}>{i.name}</Text>
                                                        </Flex>
                                                    </MenuItem>
                                                )}
                                            </MenuList>
                                        </MenuList>
                                    </>
                                )}
                            </Menu>
                        </Flex>
                    </Block>
                </Flex>
                <Flex alignItems={"stretch"} justifyContent={"center"}>
                    <Button size={"lg"} bg={'#36AB7E'} mt={6} color={'white'}>
                        Exchange
                    </Button>
                </Flex>
            </Block>
        </>
    )
}

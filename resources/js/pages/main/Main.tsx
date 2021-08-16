import {
    Text,
    Flex,
    Grid,
    GridItem,
    Link,
    Button,
    InputGroup,
    Input,
    Table,
    Thead,
    Th,
    Tr,
    Tbody,
    useColorMode
} from "@chakra-ui/react";
import React, {FC, useState} from "react";
import {History, HistoryInterface} from "./history/History";
import {Block} from "../../config/ui/Block";

interface MainInterface {
}


const arr = [
    {
        transaction_id: "#SK2544",
        name: "Ronald Taylor",
        date: "2019-10-04",
        amount: "$404",
        badge_status: "orange",
        badge_message: "Не обработано"
    },
    {
        transaction_id: "#SK2544",
        name: "Ronald Taylor",
        date: "2019-10-04",
        amount: "$404",
        badge_status: "orange",
        badge_message: "Не обработано"
    },
    {
        transaction_id: "#SK2544",
        name: "Ronald Taylor",
        date: "2019-10-04",
        amount: "$404",
        badge_status: "orange",
        badge_message: "Не обработано"
    },
    {
        transaction_id: "#SK2544",
        name: "Ronald Taylor",
        date: "2019-10-04",
        amount: "$404",
        badge_status: "orange",
        badge_message: "Не обработано"
    },
]

export const Main: FC<MainInterface> = () => {
    const {colorMode} = useColorMode()
    const [activeLink, setActiveLink] = useState<string>('withdrawal');
    const linkHandler = (string: string) => setActiveLink(() => string)

    return (
        <Flex w='100%' flexDirection='column'>
            <Grid templateColumns={{base: "repeat(1, 1fr)" , lg: "repeat(5, 1fr)"}} gap={6}>
                <GridItem colSpan={{base: 1 , lg: 2}}>
                    <Block p={5} borderRadius='6px' w={'100%'}>
                        <Text fontWeight={700} fontSize={'1.125rem'}>Баланс</Text>
                        <Flex pt={6}>
                            <Flex flexDirection={'column'} flex={1}>
                                <Text color={'#BEC4DF'}>На счету</Text>
                                <Text fontWeight={600} fontSize={"1.5rem"}>$334,252</Text>
                            </Flex>
                            <Flex flexDirection={'column'} flex={1}>
                                <Text color={'#BEC4DF'}>Инвестиции</Text>
                                <Text fontWeight={600} fontSize={"1.5rem"}>$4230,380</Text>
                            </Flex>
                        </Flex>
                        <Flex pt={6}>
                            <Text color='#36AB7E' pr={3}>
                                420$ ↑
                            </Text>
                            <Text color='#BEC4DF'>
                                From previous period
                            </Text>
                        </Flex>
                    </Block>
                </GridItem>
                <GridItem colSpan={{base: 1 , lg: 3}}>
                    <Block h={'100%'} p={5} borderRadius='6px'>
                        <Flex pb={6} justifyContent='space-between'>
                            <Text fontWeight={700} fontSize={'1.125rem'}>Баланс</Text>
                            <Flex>
                                <Link pr={4}
                                      fontWeight={600}
                                      fontSize={'1.125rem'}
                                      color={
                                          activeLink === 'replenishment' ? '#36AB7E' :
                                              colorMode === 'light' ? "#1C273C" : "#fff"}
                                      onClick={() => linkHandler("replenishment")}
                                >
                                    Пополнение
                                </Link>
                                <Link fontWeight={600} fontSize={'1.125rem'}
                                      color={activeLink === 'withdrawal' ? '#36AB7E' : colorMode === 'light' ? "#1C273C" : "#fff"}
                                      onClick={() => linkHandler("withdrawal")}
                                >
                                    Вывод средств
                                </Link>
                            </Flex>
                        </Flex>
                        <Text pb={6} color={'#A2ABCA'} fontSize={'14px'}>
                            Вывод средств осуществляется в течение 24 часов
                        </Text>
                        <Flex>
                            <InputGroup
                                size="md"
                                color={'#A2ABCA'}
                                border='none'
                                borderRadius='6px'
                                boxShadow='none'
                                bg={colorMode === 'light' ? "#ECF0FA" : "#1F232D"}
                            >
                                <Input
                                    h={'50px'}
                                    border='none'
                                    outline={'none'}
                                    placeholder="Введите сумму"
                                    _focus={{
                                        border: '1 px solid black'
                                    }}
                                />
                            </InputGroup>
                            <Button
                                h={'50px'}
                                w={'150px'}
                                ml={5}
                                size={'lg'} bg={'#36AB7E'} color={'white'}>
                                Вывод
                            </Button>
                        </Flex>

                    </Block>
                </GridItem>
            </Grid>

            <Block mt={5} h={'100%'} p={5} borderRadius='6px'>
                <Text fontWeight={700} pb={5} fontSize={'1.125rem'}>История</Text>
                <Table>
                    <Thead>
                        <Tr>
                            <Th textTransform={'none'} fontSize={'1rem'} fontWeight={600}>Order ID</Th>
                            <Th textTransform={'none'} fontSize={'1rem'} fontWeight={600}>Billing Name</Th>
                            <Th textTransform={'none'} fontSize={'1rem'} fontWeight={600}>Date</Th>
                            <Th textTransform={'none'} fontSize={'1rem'} fontWeight={600}>Total</Th>
                            <Th textTransform={'none'} fontSize={'1rem'} fontWeight={600}>Payment Status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {arr.map((item: HistoryInterface, key: number) => (
                            <History
                                key={key}
                                transaction_id={item.transaction_id}
                                name={item.name}
                                date={item.date}
                                amount={item.amount}
                                badge_status={item.badge_status}
                                badge_message={item.badge_message} type={key++ % 2 === 0 ? "even" : "odd"}/>
                        ))}
                    </Tbody>

                </Table>

            </Block>

        </Flex>
    )
};

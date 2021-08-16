import React, {useEffect, useState} from 'react'
import {Block} from "../../config/ui/Block";
// @ts-ignore
import Calendar from 'react-awesome-calendar';
import {Box, Flex, Spinner} from "@chakra-ui/react";
import axios from "axios";
import {BACKEND_API_URL} from "../../config/app.config";
import {CreateRequest, CreateRequestInterface} from "./request/CreateRequest";


interface MainInterface {
}

interface EventInterface {
    id: number,
    color: string,
    title: string,
    from: string | Date,
    to: string | Date
}

export const Main: React.FC<MainInterface> = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [events, setEvents] = useState<EventInterface[] | []>([])
    const [chooseEvent, setChooseEvent] = useState<null | CreateRequestInterface>(null)
    const [sendRequest, setSendRequest] = useState(false)

    const eventHandler = (event: number) => {
        const filteredEvent = events.filter((item:EventInterface) => item.id === event)[0]
        setChooseEvent(() => ({
            id: filteredEvent.id,
            title: filteredEvent.title,
            date: filteredEvent.from
        }))
        setSendRequest(true)
    }

    useEffect(() => {
        axios.get(`${BACKEND_API_URL}calendar`)
            .then(resp => {
                const result = resp.data.map((item: any) => ({
                    id: Number(item.id),
                    color: '#3694DF',
                    title: item.event.replace(/<\/?[^>]+(>|$)/g, ""),
                    from: item.date,
                    to: new Date(new Date(item.date).getTime() + 3600 * 2 * 1000)
                }))
                setEvents(() => result)
                setLoading(() => false)
            })
            .catch(error => console.log(error))
    }, [])
    if (loading) {
        return (
            <Block>
                <Box py={4} px={8}>
                    <Flex w={"100%"}
                          h={"100vh"}
                          position={"fixed"}
                          top={0}
                          left={0}
                          justifyContent={"center"}
                          alignItems={"center"}
                    >
                        <Spinner thickness="4px"
                                 speed="0.65s"
                                 emptyColor="gray.200"
                                 color="teal"
                                 size="xl"/>
                    </Flex>
                </Box>
            </Block>
        )
    }
    if (sendRequest && chooseEvent) {
        return (
            <CreateRequest id={chooseEvent.id} title={chooseEvent.title} date={chooseEvent.date}/>
        )
    }
    return (
        <>
            <Block>
                <Box py={4} px={8}>
                    <Calendar
                        events={events}
                        onClickEvent={eventHandler}
                    />
                </Box>
            </Block>
        </>
    )
}

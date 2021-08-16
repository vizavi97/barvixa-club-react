import {Box, Flex} from '@chakra-ui/react';
import React, {useEffect, useState} from 'react'
import {Block} from '../../../config/ui/Block';
import {SideBar} from './SideBar';
import TopBar from './TopBar';
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {getPlayers} from "../../../store/actions/player.action";
import {getTeams} from "../../../store/actions/team.action";

export const CoachLayout: React.FC = ({children}) => {
    const {coach} = useSelector((state: RootStateOrAny) => state)
    const dispatch = useDispatch();
    useEffect(() => {
        if (coach.coach) {
            dispatch(getPlayers(coach.coach.id));
            dispatch(getTeams(coach.coach.id));
        }
    }, [coach.coach])
    return (
        <Flex>
            <Flex
                left='0'
                top='0'
                h='100vh'
                position={"fixed"}
                w={'220px'}
                className={'sidebar'}
                d={{base: 'none', lg: "flex"}}
                zIndex={2}
            >
                <Block w={"100%"}>
                    <SideBar/>
                </Block>
            </Flex>
            <Flex flexDirection={'column'}
                  minH='100vh'
                  flex={1}
                  paddingLeft={{base: '0', lg: "220px"}}
                  position={'relative'}
                  overflowX='hidden'
            >
                <TopBar/>
                <Flex flexDirection={'column'} px={'1.25rem'} py={'1.5rem'}>
                    <Box pt={6}>
                        {children}
                    </Box>
                </Flex>
            </Flex>
        </Flex>
    )
};

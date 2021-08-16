import React, {useEffect, useState} from 'react'
import {Button, Flex, Grid} from "@chakra-ui/react";
import {PlayerCard} from "./PlayerCard";
import {SkeletonStack} from "../../../components/ui/skeleton/SkeletonStack";
import {CreatePlayer, CreatePlayerFormInterface} from "./CreatePlayer";
import {RootStateOrAny, useSelector} from "react-redux";


export const Staff: React.FC = () => {
    const {player} = useSelector((state: RootStateOrAny) => state)
    const [create, setCreate] = useState<boolean>(false)
    return (
        <>
            <Flex mb={4} justifyContent={"flex-end"}>
                <Button colorScheme={create ? "orange" : "blue"} variant="solid" size={'lg'}
                        onClick={() => setCreate(prevState => !prevState)}>
                    {create ? "Отменить" : "Добавить Игрока"}
                </Button>
            </Flex>
            {create
                ? <CreatePlayer logout={() => setCreate(prevState => !prevState)}/>
                : <Grid
                    templateColumns={{base: 'repeat(1, 1fr)', md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)"}}
                    gap={6}>
                    {player.loader
                        ? <SkeletonStack length={3}/>
                        : player.players.length ? player.players.map((item: CreatePlayerFormInterface, key: number) =>
                            <PlayerCard
                                key={key}
                                id={item.id ?? ""}
                                icon={item.preview_img.path}
                                name={item.name} surname={item.surname} number={item.game_number}
                                position={item.position}/>) : null
                    }
                </Grid>
            }
        </>
    )
}

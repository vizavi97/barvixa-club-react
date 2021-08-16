import React, {useState} from 'react'
import {Button, Flex, Grid} from "@chakra-ui/react";
import {SkeletonStack} from "../../../components/ui/skeleton/SkeletonStack";
import {TeamsCard, TeamsCardInterface} from "./TeamsCard";
import {CreateTeam} from "./CreateTeam";
import {CreatePlayerFormInterface} from "../staff/CreatePlayer";
import {PlayerCard} from "../staff/PlayerCard";
import {RootStateOrAny, useSelector} from "react-redux";


export const Teams: React.FC = () => {
    const {team} = useSelector((state: RootStateOrAny) => state)
    const [create, setCreate] = useState<boolean>(false)
    return (
        <>
            <Flex mb={4} justifyContent={"flex-end"}>
                <Button colorScheme={create ? "orange" : "blue"} variant="solid" size={'lg'}
                        onClick={() => setCreate(prevState => !prevState)}>
                    {create ? "Отменить" : "Добавить Команду"}
                </Button>
            </Flex>
            {create
                ? <CreateTeam logout={() => setCreate(state => !state)}/>
                : <Grid
                    templateColumns={{base: 'repeat(1, 1fr)', md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)"}}
                    gap={6}>
                    {team.loader
                        ? <SkeletonStack length={3}/>
                        : team.teams.length ? team.teams.map((item: TeamsCardInterface, key: number) =>
                            <TeamsCard
                                key={key}
                                id={item.id ?? ""}
                                img={item.img.path}
                                name={item.name}/>) : null
                    }
                </Grid>
            }

        </>
    )
}

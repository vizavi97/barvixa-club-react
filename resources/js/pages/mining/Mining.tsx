import React, {useEffect, useState} from 'react'
import {
    Button,
    Flex,
    Grid,
    GridItem
} from "@chakra-ui/react";
import {MiningCard, MiningCardInterface} from "./MiningCard";
import axios from "axios";
import {BACKEND_API_URL} from "../../config/app.config";

export const Mining: React.FC = () => {

    useEffect(() => {
        axios.get(`${BACKEND_API_URL}mining`)
            .then(resp => setState(() => resp.data))
            .catch(err => console.log('error', err))
    }, []);

    const [state, setState] = useState<MiningCardInterface[] | []>([]);
    console.log(state)
    return (
        <>
            <Flex justifyContent={"flex-end"}>
                <Button bg={'#dd6b20'} color={'white'} mr={6}>Tariffs</Button>
                <Button bg={'#36AB7E'} color={'white'}>Actives</Button>
            </Flex>
            <Grid
                templateColumns={{
                    base: 'repeat(1, 1fr)',
                    md: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)",
                    xl: "repeat(4, 1fr)"
                }}
                gap={6}
                pt={10}

            >
                {state.map((item, key: number) =>
                    <GridItem colSpan={1} key={key}>
                        <MiningCard
                            name={item.name} type={item.type} preview_img={item.preview_img}
                            base_invest_value={item.base_invest_value}
                            base_profit_value={item.base_profit_value}
                            is_active={item.is_active}
                            daily_cost={item.daily_cost}
                            v_energy_count={item.v_energy_count}
                        />
                    </GridItem>
                )}
            </Grid>
        </>
    )
}

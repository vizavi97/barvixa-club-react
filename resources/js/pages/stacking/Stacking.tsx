import React, {useEffect, useState} from 'react'
import {Grid} from "@chakra-ui/react";
import {StackingCard, StackingCardInterface} from "./components/StackingCard";
import axios from "axios";
import {BACKEND_API_URL} from "../../config/app.config";


export const Stacking: React.FC = () => {
    const [state, setState] = useState<StackingCardInterface[] | []>([])

    useEffect(() => {
        axios.get(`${BACKEND_API_URL}stacking`)
            .then(resp => setState(() => resp.data))
    }, [])
    return (
        <>
            <Grid
                templateColumns={{
                    base: 'repeat(1, 1fr)',
                    md: "repeat(2, 1fr)",
                    lg: "repeat(2, 1fr)",
                    xl: "repeat(3, 1fr)"
                }}
                gap={6}>
                {state.map((item, key) => <StackingCard preview_img={item.preview_img} key={key} name={item.name}
                                                        profit={item.profit} min_attachment={item.min_attachment}
                                                          type={item.type}/>)}
            </Grid>
        </>
    )
}

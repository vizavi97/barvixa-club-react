import React from 'react'
import { SkeletonCircle, SkeletonText} from '@chakra-ui/react'
import {Block} from "../../../config/ui/Block";

interface SkeletonStackInterface {
    length: number,
}

export const SkeletonStack: React.FC<SkeletonStackInterface> = ({length}) => {
    const arr = new Array(length).fill('');
    return (
        <>
            {arr.map((_, key: number) =>
                    <Block key={key} padding="6" boxShadow="lg">
                        <SkeletonCircle size="10"/>
                        <SkeletonText mt="4" noOfLines={4} spacing="4"/>
                    </Block>
            )}
        </>
    )
}
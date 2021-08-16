import {Badge, Td, Tr, useColorMode} from '@chakra-ui/react';
import React from 'react'

export interface HistoryInterface {
    transaction_id: string,
    name: string,
    date: string | Date,
    amount: string | number,
    badge_status: "orange" | string,
    badge_message: string,
    type?: "odd" | "even"
}

export const History: React.FC<HistoryInterface> = ({transaction_id, name, date, amount, badge_message, badge_status, type}) => {
    const {colorMode} = useColorMode();

    return (
        <Tr bg={
            type === "even" && colorMode === "light" ? "#ECF0FA"
                : type === "even" && colorMode === "dark" ? "#040404"
                : 'transparent' }>
            <Td color={colorMode === 'light' ? "#8592A9" : "#A6B0CF"} border='none'>{transaction_id}</Td>
            <Td color={colorMode === 'light' ? "#8592A9" : "#A6B0CF"} border='none'>{name}</Td>
            <Td color={colorMode === 'light' ? "#8592A9" : "#A6B0CF"} border='none'>{date}</Td>
            <Td color={colorMode === 'light' ? "#8592A9" : "#A6B0CF"} border='none'>{amount}</Td>
            <Td color={colorMode === 'light' ? "#8592A9" : "#A6B0CF"} border='none'>
                <Badge colorScheme={badge_status}>{badge_message}</Badge>
            </Td>
        </Tr>
    )
};

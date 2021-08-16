import {Flex} from '@chakra-ui/react';
import React from 'react'
import {WalletItem, WalletItemInterface} from "./components/WalletItem";

const arr = [
    {
        name: "Bitcoin",
        short_name: "BTC",
        value: "2.00000001 BTC",
        value_on_usd: "62,590.27 USD",
        one_crypto_cost: '35,134.50',
        change: "2.22% 24 hours",
        color: "#F6921A",
        data_for_chart: [20, 18, 35, 18, 17, 32, 36, 15, 17, 10,32 ,10],
    },
    {
        name: "Ethereum",
        short_name: "ETH",
        value: "2.00000001 ETH",
        value_on_usd: "62,590.27 USD",
        one_crypto_cost: '35,134.50',
        change: "2.22% 24 hours",
        color: "#687EE3",
        data_for_chart: [20, 18, 35, 18, 17, 32, 36, 15, 17, 10,32 ,10],
    },
    {
        name: "Binance Coin",
        short_name: "BNB",
        value: "2.00000001 BTC",
        value_on_usd: "62,590.27 USD",
        one_crypto_cost: '35,134.50',
        change: "2.22% 24 hours",
        color: "#F0B90B",
        data_for_chart: [20, 18, 35, 18, 17, 32, 36, 15, 17, 10,32 ,10],
    },
    {
        name: "Litecoin",
        short_name: "LTC",
        value: "2.00000001 BTC",
        value_on_usd: "62,590.27 USD",
        one_crypto_cost: '35,134.50',
        change: "2.22% 24 hours",
        color: "#4382E9",
        data_for_chart: [20, 18, 35, 18, 17, 32, 36, 15, 17, 10,32 ,10],
    },
    {
        name: "Tether",
        short_name: "USDT",
        value: "2.00000001 BTC",
        value_on_usd: "62,590.27 USD",
        one_crypto_cost: '35,134.50',
        change: "2.22% 24 hours",
        color: "#50AF95",
        data_for_chart: [20, 18, 35, 18, 17, 32, 36, 15, 17, 10,32 ,10],
    },
    {
        name: "XRP",
        short_name: "XRP",
        value: "2.00000001 BTC",
        value_on_usd: "62,590.27 USD",
        one_crypto_cost: '35,134.50',
        change: "2.22% 24 hours",
        color: "#E1E1E1",
        data_for_chart: [20, 18, 35, 18, 17, 32, 36, 15, 17, 10,32 ,10],
    },

]

export const Wallet: React.FC = () => {

    return (
        <Flex flexDirection={'column'}>
            {arr.map((item: WalletItemInterface, key: number) => <WalletItem
                    key={key} name={item.name} short_name={item.short_name} value={item.value}
                    value_on_usd={item.value_on_usd} one_crypto_cost={item.one_crypto_cost}
                    change={item.change} color={item.color} data_for_chart={item.data_for_chart}
                    image={"https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1024px-Bitcoin.svg.png"}
                />
            )}

        </Flex>
    )
};

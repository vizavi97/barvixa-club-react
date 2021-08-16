import {InputGroup, Input, InputLeftElement, useColorMode} from '@chakra-ui/react';
import {Search2Icon} from '@chakra-ui/icons';
import React, {useState} from 'react'

interface SearchInterface {
}

export const Search: React.FC<SearchInterface> = () => {
    const {colorMode} = useColorMode();
    const [focus, setFocus] = useState<boolean>(false);
    return (
        <InputGroup size="md"
                    border='none'
                    borderRadius='6px'
                    pr={'1.5rem'}
                    color={'#A2ABCA'}
                    bg={colorMode === 'light' ? "#ECF0FA" : "#1F232D"}
                    w={focus ? "100%" : 'auto'}
                    boxShadow='none'
                    _focus={{color: 'white'}}
        >
            <InputLeftElement mt={'.25rem'}>
                <Search2Icon/>
            </InputLeftElement>
            <Input
                h={'46px'}
                border='none'
                onFocus={() => setFocus(() => true)}
                onBlur={() => setFocus(() => false)}
                _focus={{w: "100%"}}
                pr={'0'}
                outline={'none'}
                placeholder="Поиск"
            />
        </InputGroup>
    )
};

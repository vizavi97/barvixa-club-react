import React, {ChangeEvent, useState} from 'react'
import {Button, Input, InputGroup, InputLeftElement, InputRightElement} from "@chakra-ui/react";
import {CloseIcon, Search2Icon} from "@chakra-ui/icons";
import {useDispatch} from "react-redux";
import {setFilteredString} from "../../store/actions/accountant.action";

export const AccountantFilter: React.FC = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState<string>("")
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    setValue(() => inputValue)
    dispatch(setFilteredString(inputValue.toLowerCase()))
  }
  return (
    <>
      <InputGroup size="md"
                  border='none'
                  borderRadius='6px'
                  color={'blackAlpha.700'}
                  bg={"#ECF0FA60"}
                  w={'auto'}
                  boxShadow='none'
      >
        <InputLeftElement mt={'.25rem'}>
          <Search2Icon/>
        </InputLeftElement>
        <Input
          h={'46px'}
          border='none'
          pr={'0'}
          outline={'none'}
          placeholder="Поиск"
          value={value}
          onChange={changeHandler}
        />
        {value.length > 0 &&
        <InputRightElement
          mt={'.25rem'}
          as={Button}
          cursor={"pointer"}
          onClick={() => {
            dispatch(setFilteredString(''))
            setValue(() => "")
          }}
        >
          <CloseIcon/>
        </InputRightElement>
        }
      </InputGroup>
    </>
  )
}

import React, {ChangeEvent, useState} from 'react'
import {Input, Td, Tr} from "@chakra-ui/react";
import {useDispatch} from "react-redux";
import {changeConsumableInArray} from "../../store/actions/accountant.action";

interface CalculationConsumableCellInterface {
  id: number
  name: string
  type: string
  count: number
  cost: number
  amount: number
}

interface formStateInterface {
  count: number
  cost: number
  amount: number
}

export const CalculationConsumableCell: React.FC<CalculationConsumableCellInterface> = ({
                                                                                          id,
                                                                                          name,
                                                                                          type,
                                                                                          count,
                                                                                          cost,
                                                                                          amount
                                                                                        }) => {
  const dispatch = useDispatch()
  const changeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target
    dispatch(changeConsumableInArray(id,name,+value))
  }


  return (
    <>
      <Tr
        id={id as unknown as string}
      >
        <Td width={"8rem"}>{name}</Td>
        <Td width={"4rem"}>{type}</Td>
        <Td width={"6rem"}>
          <Input type={'number'}
                 name={'count'}
                 value={count}
                 onChange={changeInputHandler}
                 px={1}
                 min={0}
          />
        </Td>
        <Td width={"6rem"}>
          <Input type={'number'}
                 name={'cost'}
                 value={cost}
                 onChange={changeInputHandler}
                 px={1}
                 min={0}
          />
        </Td>
        <Td width={"6rem"}>
          <Input type={'number'}
                 name={'amount'}
                 value={amount}
                 onChange={changeInputHandler}
                 px={1}
                 min={0}
          />
        </Td>
      </Tr>
    </>
  )
}

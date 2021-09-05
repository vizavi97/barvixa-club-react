import React, {ChangeEvent, useState} from 'react'
import {Input, Td, Tr} from "@chakra-ui/react";

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
  const [formState, setFormState] = useState<formStateInterface>({
    count,
    cost,
    amount
  })

  const changeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
    setFormState(state => ({
      ...state,
      [event.target.name]: event.target.value
    }))
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
                 value={formState.count}
                 onChange={changeInputHandler}
                 px={1}
          />
        </Td>
        <Td width={"6rem"}>
          <Input type={'number'}
                 name={'cost'}
                 value={formState.count}
                 onChange={changeInputHandler}
                 px={1}
          />
        </Td>
        <Td width={"6rem"}>
          <Input type={'number'}
                 name={'number'}
                 value={formState.count}
                 onChange={changeInputHandler}
                 px={1}
          />
        </Td>
      </Tr>
    </>
  )
}

import React, {useEffect} from 'react'
import {Divider, Flex} from "@chakra-ui/react";
import {ConsumablesTable} from "../../../components/Accountant/ConsumablesTable";
import {Block} from "../../../config/ui/Block";
import {ListOfConsumables} from "../../../components/Accountant/ListOfConsumables";
import {useDispatch} from "react-redux";
import {getConsumables} from "../../../store/actions/accountant.action";
import {AccountantFilter} from "../../../components/Accountant/AccountantFilter";
import {LeftOvers} from "../../../components/Accountant/LeftOvers";

interface AccountantInterface {
}

export const Accountant: React.FC<AccountantInterface> = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getConsumables())
  }, [])
  return (
    <Block>
      <Block p={2} mb={4}>
        <AccountantFilter/>
      </Block>
      <Flex justifyContent={"center"}>
        <Flex flex={1}>
          <ConsumablesTable/>
          <Divider mx={1} orientation="vertical"/>
        </Flex>
        <Flex flex={1} ml={2}>
          <ListOfConsumables/>
        </Flex>
        <Flex flex={1} ml={2}>
          <Divider mx={1} orientation="vertical"/>
          <LeftOvers/>
        </Flex>
      </Flex>
    </Block>
  )
}

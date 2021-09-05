import React, {useEffect} from 'react'
import {Divider, Flex} from "@chakra-ui/react";
import {ConsumablesTable} from "../../../components/Accountant/ConsumablesTable";
import {Block} from "../../../config/ui/Block";
import {ListOfConsumables} from "../../../components/Accountant/ListOfConsumables";
import {useDispatch} from "react-redux";
import {getConsumables} from "../../../store/actions/accountant.action";
import {AccountantFilter} from "../../../components/Accountant/AccountantFilter";

interface AccountantInterface {
}

export const Accountant: React.FC<AccountantInterface> = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getConsumables())
  },[])



  return (
    <Block>
      <Block p={2} mb={4}>
        <AccountantFilter/>
      </Block>
      <Flex>
        <Flex>
          <ConsumablesTable/>
          <Divider orientation="vertical" />
        </Flex>
        <Flex ml={2}>
          <ListOfConsumables/>
        </Flex>
      </Flex>
    </Block>
  )
}

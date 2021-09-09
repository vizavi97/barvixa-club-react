import React, {useEffect, useState} from 'react'
import {Block} from "../../../config/ui/Block";
import axios from "axios";
import {BACKEND_API_URL} from "../../../config/app.config";
import {RequestItem, RequestItemInterface} from "./RequestItem";
import {Flex, Spinner} from "@chakra-ui/react";

interface ListRequestInterface {
  isCreate: boolean
}

export const ListRequest: React.FC<ListRequestInterface> = ({isCreate}) => {
  const [data, setDate] = useState<[] | RequestItemInterface[]>([])
  const [isLoad, setIsLoad] = useState<boolean>(false)
  useEffect(() => {
    setIsLoad(() => true)

    axios.get(`${BACKEND_API_URL}request`, {
      headers: {
        "Authorization": `${localStorage.getItem('token')}`
      }
    })
      .then(resp => {
        setIsLoad(() => false)
        setDate(() => resp.data)
      })
      .catch(error => {
        setIsLoad(() => false)
        console.log(":LIST error:", error)
      })
  }, [isCreate]);
  console.log(data)

  if (isCreate) return null
  return (
    <Block mt={4}>
      {isLoad && <Flex p={"4rem"} justifyContent={"center"} alignItems={"center"}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        /></Flex>}
      {!isLoad && data.length > 0 && data.map((item:any, key) =>
        <RequestItem
          key={key}
          id={item.id}
          amount={item.amount}
          products={item.products}
          status={item.status.title as string}
          hall={item.hall.title as string}
          place={item.place.number}
          created_at={item.created_at}
        />)}
    </Block>
  )
}

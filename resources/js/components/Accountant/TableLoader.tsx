import React from 'react'
import {Checkbox, SkeletonCircle, SkeletonText, Td, Tr} from "@chakra-ui/react";

interface TableLoaderInterface {
  length?: number
}

export const TableLoader: React.FC<TableLoaderInterface> = ({length}) => {
  const arr = new Array(length ? length : 1).fill('')
  return (
    <>
      {
        arr.map((_: string, key: number) =>
          <Tr w={'100%'} key={key}>
            <Td>
              <SkeletonCircle size="4" color={"telegram"}/>
            </Td>
            <Td w={'100%'}><SkeletonText noOfLines={1} spacing="1"/></Td>
          </Tr>
        )
      }
    </>
  )
}

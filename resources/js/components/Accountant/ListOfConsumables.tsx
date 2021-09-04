import React, {useState, DragEvent, useCallback, useRef} from 'react'
import {Box, Table, Tbody, Th, Thead, Tr} from "@chakra-ui/react";
import {ConsumableCell} from "./ConsumableCell";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {AccountantStateInterface} from "../../store/interfaces/accountant";
import {putToChoseConsumables} from "../../store/actions/accountant.action";

interface ListOfConsumablesInterface {
}

export const ListOfConsumables: React.FC<ListOfConsumablesInterface> = () => {
  const dispatch = useDispatch()
  const {isChoseConsumables} = useSelector((state: RootStateOrAny) => state.accountant as AccountantStateInterface)

  const tableRef = useRef<HTMLTableElement>(null);

  const DragEnterHandler = useCallback((event: DragEvent<HTMLTableElement>) => {
    event.preventDefault()
    event.stopPropagation()
    tableRef.current?.classList.add('drag');
  }, [])

  const DragLeaveHandler = useCallback((event: DragEvent<HTMLTableElement>) => {
    event.preventDefault()
    event.stopPropagation()
    tableRef.current?.classList.remove('drag');
  }, [])

  const DragEndHandler = useCallback((event: DragEvent<HTMLTableElement>) => {
    event.preventDefault()
    event.stopPropagation()
    tableRef.current?.classList.remove('drag');
  }, [])

  const DragOverHandler = useCallback((event: DragEvent<HTMLTableElement>) => {
    event.preventDefault()
    // tableRef.current?.classList.remove('drag');
  }, [])

  const DropHandler = useCallback((event: DragEvent<HTMLTableElement>) => {
    const id = event.dataTransfer.getData('id')
    dispatch(putToChoseConsumables(id))
  },[])
  return (
    <Box position={"relative"}>
      <Table variant="simple"
             onDragEnter={event => DragEnterHandler(event)}
             onDragLeaveCapture={event => DragLeaveHandler(event)}
             onDragEnd={event => DragEndHandler(event)}
             onDragOver={event => DragOverHandler(event)}
             onDrop={event => DropHandler(event)}
             ref={tableRef}
             className={"draggable-table"}
      >
        <Thead sx={{
          tableLayout: "fixed",
          borderCollapse: "collapse",
          display: "block"
        }}>
          <Tr>
            {/*<Th><Checkbox size="sm" colorScheme="green" defaultIsChecked/></Th>*/}
            <Th>Наименование</Th>
            <Th>Ед изм</Th>
            <Th>Группа</Th>
            <Th isNumeric>Цена по <br/> накладдной</Th>
          </Tr>
        </Thead>
        <Tbody sx={{
          display: "block",
          overflow: "auto",
          height: "calc(100vh - 120px)",
          width: "100%"
        }}>
          {isChoseConsumables.length > 0 && isChoseConsumables.map((item, key) =>
            <ConsumableCell
              id={item.id}
              name={item.title}
              type={item.type}
              cost={item.price}
              group={item.group}
              key={key}/>)}
        </Tbody>
      </Table>
    </Box>
  )
}

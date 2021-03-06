import React, {DragEvent, useCallback, useRef} from 'react'
import {Box, Table, Tbody, Th, Thead, Tr, Text, useToast, Tfoot, Button, Td} from "@chakra-ui/react";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {AccountantStateInterface} from "../../store/interfaces/accountant";
import {
  deleteAllChoseConsumables,
  putToChoseConsumables,
  sendAllConsumable
} from "../../store/actions/accountant.action";
import {CalculationConsumableCell} from "./СalculationConsumableCell";

export const ListOfConsumables: React.FC = () => {
  const dispatch = useDispatch()
  const toast = useToast();
  const {isChoseConsumables} = useSelector((state: RootStateOrAny) => state.accountant as AccountantStateInterface)

  const tableRef = useRef<HTMLDivElement>(null);

  const DragEnterHandler = useCallback((event: DragEvent<HTMLDivElement>) => {
    const htmlEl = tableRef.current as HTMLElement
    event.preventDefault()
    htmlEl.classList.add('draggable');
  }, [])

  const DragLeaveHandler = useCallback((event: DragEvent<HTMLDivElement>) => {
    const htmlEl = tableRef.current as HTMLElement
    event.preventDefault()
    htmlEl.classList.remove('draggable');
  }, [])

  const DragOverHandler = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }, [])

  const DropHandler = useCallback((event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('id')
    tableRef.current?.classList.remove('draggable');
    const same = isChoseConsumables.length ? isChoseConsumables.some((item) => item.id === Number(id)) : false
    if (same) {
      return toast({
        title: "Предупреждение",
        position: "top",
        description: "Такой расходный материал уже имеется в  наличие",
        status: "warning",
        duration: 4000,
        isClosable: true,
      })
    }
    return dispatch(putToChoseConsumables(id))
  }, [isChoseConsumables])
  return (
    <Box
      sx={{
        w: "100%",
        position: "relative",
        background: "#fff",
        color: "#1c273c",
        boxShadow: "0px 8px 25px #0508090F",
        p: "1rem",
        "& td,& th": {
          paddingX: "0.325rem"

        }
      }}
      onDragEnter={event => DragEnterHandler(event)}
      ref={tableRef}
    >
      <Box className={'inner'}
           onDragOver={event => DragOverHandler(event)}
           onDragLeaveCapture={event => DragLeaveHandler(event)}
           onDrop={event => DropHandler(event)}
      />
      <Box className={'inner-text'}>
        <Text fontWeight={"700"}
              fontSize={"1.75rem"}
        >Перенесите расходку сюда!!</Text>
      </Box>
      <Table variant="simple">

        <Thead sx={{
          tableLayout: "fixed",
          borderCollapse: "collapse",
          display: "block"
        }}>
          <Tr>
            {/*<Th><Checkbox size="sm" colorScheme="green" defaultIsChecked/></Th>*/}
            <Th width={"8rem"}>Наименование</Th>
            <Th width={"4rem"}>Ед изм</Th>
            <Th width={"6rem"} isNumeric>Цена ед<br/> изм. </Th>
            <Th width={"6rem"} isNumeric>Кол-во</Th>
            <Th width={"6rem"} isNumeric>Сумма</Th>
          </Tr>
        </Thead>
        <Tbody sx={{
          display: "block",
          overflow: "auto",
          height: "calc(100vh - 240px)",
          width: "100%"
        }}>
          {isChoseConsumables.length > 0 && isChoseConsumables.map((item, key) =>
            <CalculationConsumableCell
              key={key}
              id={item.id}
              name={item.title}
              type={item.type}
              count={item.count}
              cost={item.cost}
              amount={item.amount}
            />
          )}
        </Tbody>
        {isChoseConsumables.length > 0 &&
        <Tfoot sx={{
          tableLayout: "fixed",
          borderCollapse: "collapse",
          display: "block"
        }}>
          <Tr>
            <Td width={"6rem"} px={0}>
              <Button colorScheme={"red"}
                      type={"button"}
                      onClick={() => dispatch(deleteAllChoseConsumables())}
              >Очистить список</Button>
            </Td>
            <Td width={"6rem"} px={0}>
              <Button colorScheme={"green"}
                      type={"button"}
                      onClick={() => dispatch(sendAllConsumable(isChoseConsumables))}
              >Внести</Button>
            </Td>
          </Tr>
        </Tfoot>
        }

      </Table>
    </Box>
  )
}

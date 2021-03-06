import React, {useMemo} from 'react'
import {Button, Table, Tbody, Tfoot, Th, Thead, Tr} from "@chakra-ui/react";
import {ConsumableCell} from "./ConsumableCell";
import {TableLoader} from "./TableLoader";
import {RootStateOrAny, useSelector} from "react-redux";
import {AccountantStateInterface} from "../../store/interfaces/accountant";
import {Block} from "../../config/ui/Block";


export const ConsumablesTable: React.FC = () => {
  const {
    consumables,
    isLoading,
    filteredString
  } = useSelector((state: RootStateOrAny) => state.accountant as AccountantStateInterface)

  const filteredArr = useMemo(() => consumables.filter(item => Object.values(item)
    .some(subItem => subItem.toString().toLowerCase().trim().includes(filteredString))), [filteredString]);
  return (
    <Block sx={{
      w: "100%",
      position: "relative",
      p: "1rem",
      "& td,& th": {
        paddingX: "0.325rem"
      }}}>
      <Table variant="simple"
      >
        <Thead sx={{
          tableLayout: "fixed",
          borderCollapse: "collapse",
          display: "block"
        }}>
          <Tr>
            {/*<Th><Checkbox size="sm" colorScheme="green" defaultIsChecked/></Th>*/}
            <Th width={"8rem"}>Наименование</Th>
            <Th width={"4rem"}>Ед изм</Th>
            <Th width={"6rem"}>Группа</Th>
            <Th width={"4rem"} isNumeric>Цена по <br/> накладдной</Th>
          </Tr>
        </Thead>
        <Tbody sx={{
          display: "block",
          overflow: "auto",
          height: "calc(100vh - 200px)",
          width: "100%"
        }}>
          {(!isLoading && filteredString.length)
            ? filteredArr.map((item, key) =>
              <ConsumableCell
                id={item.id}
                name={item.title}
                type={item.type}
                cost={item.price}
                group={item.group}
                key={key}/>)
            : (!isLoading && !filteredString.length) ? consumables.map((item, key) =>
              <ConsumableCell
                id={item.id}
                name={item.title}
                type={item.type}
                cost={item.price}
                group={item.group}
                key={key}/>) : <TableLoader length={20}/>}

        </Tbody>

      </Table>
    </Block>
  )
}

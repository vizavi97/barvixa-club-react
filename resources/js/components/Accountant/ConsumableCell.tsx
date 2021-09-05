import React, {DragEvent} from 'react'
import {Checkbox, Td, Tr} from "@chakra-ui/react";

interface ConsumableCellInterface {
  id: number
  name: string
  type: string
  group: string
  cost: string | number
}

export const ConsumableCell: React.FC<ConsumableCellInterface> = ({
                                                                    id,
                                                                    name,
                                                                    type,
                                                                    group,
                                                                    cost
                                                                  }) => {
  const onDragStartHandler = (event: DragEvent<HTMLTableRowElement>, id: number) => {
    const elem = event.target as HTMLElement
    elem.style.background = "rgba(0,0,0,.2)";
    event.dataTransfer.setData('id', String(id));
  }
  const onDragOverHandler = (event: DragEvent<HTMLTableRowElement>, id: number) => {
    const elem = event.target as HTMLElement
    elem.style.background = "none";
  }

  return (
    <Tr

      id={id as unknown as string}
      sx={{
      cursor: "pointer",
      "& > *": {userSelect: "none"}
    }}
        draggable
        onDragStart={(e) => onDragStartHandler(e, id)}
        onDragEnd={(e) => onDragOverHandler(e, id)}
    >
      {/*<Td><Checkbox size="sm" colorScheme="green" defaultIsChecked/></Td>*/}
      <Td width={"8rem"}>{name}</Td>
      <Td width={"4rem"}>{type}</Td>
      <Td width={"6rem"}>{group}</Td>
      <Td width={"4rem"}
          isNumeric
          color={"red"}
      >{cost}</Td>
    </Tr>
  )
}

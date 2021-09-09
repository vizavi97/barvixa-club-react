import React, {useState} from 'react'
import {Block} from "../../../config/ui/Block";
import {
  Box,
  Button,
  Flex,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Image,
  Divider,
  Badge
} from "@chakra-ui/react";
import {RootStateOrAny, useSelector} from "react-redux";

export interface RequestItemInterface {
  id: number
  amount: number
  products: any[] | []
  status: any | string
  created_at: string | Date
  hall: string
  place: number
}

export const RequestItem: React.FC<RequestItemInterface> = ({
                                                              id,
                                                              amount,
                                                              products,
                                                              status,
                                                              created_at,
  hall,
  place
                                                            }) => {
  const {user} = useSelector((state:RootStateOrAny) => state.user)
  console.log("User", user);
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <Block p={6} mb={6} borderRadius={2}
           sx={{
             overflow: "hidden",
             position: 'relative',
             paddingBottom: "0.5rem"
           }}
    >
      <Flex
        flex={2} justifyContent={"space-between"} alignItems={"center"}
        position="relative"
        zIndex={2}
        overflow={"hidden"}
      >
        <Box>
          <Text fontSize="1.25rem" color="twitter">
            № счета: <Text as={'span'} color={"red"} fontWeight={"600"}>{id}</Text>
          </Text>
          <Text fontSize="1.25rem" color="twitter">
            Исполнитель: <Text as={'span'} color={"red"} fontWeight={"600"}>{id}</Text>
          </Text>
          <Text fontSize="1.25rem" color="twitter">
            Цена заказа: <Text as={'span'} color={"green"} fontWeight={"600"}> {amount}</Text>
          </Text>
          <Text fontSize="1.25rem" color="twitter">
            Время создания заказа: <Text as={'span'} color={"orange"} fontWeight={"600"}> {created_at}</Text>
          </Text>
          <Text fontSize="1.25rem" color="twitter">
            Зал: <Text as={'span'} color={"orange"} fontWeight={"600"}> {hall}</Text>
          </Text>
          <Text fontSize="1.25rem" color="twitter">
            Место: <Text as={'span'} color={"orange"} fontWeight={"600"}> {place}</Text>
          </Text>
          <Text fontWeight={"600"}>Статус:
            <Badge ml={4} fontSize="0.8em" colorScheme="green">
              {status}
            </Badge>
          </Text>
        </Box>

        <Button
          variant={"ghost"}
          colorScheme={"teal"}
          mr={4}
          onClick={() => setIsOpen(state => !state)}
        >
          <Box as={'span'}
               sx={{
                 position: "relative",
                 overflow: "hidden",
                 transition: "all .2s ease",
                 transform: isOpen ? "rotate(270deg)" : "rotate(90deg)"

               }}>
            <svg xmlns="http://www.w3.org/2000/svg" height="426pt" viewBox="0 -32 426.66667 426" width="20pt">
              <path
                d="m213.332031 181.667969c0 4.265625-1.277343 8.53125-3.625 11.730469l-106.667969 160c-3.839843 5.761718-10.238281 9.601562-17.707031 9.601562h-64c-11.730469 0-21.332031-9.601562-21.332031-21.332031 0-4.269531 1.28125-8.535157 3.625-11.734375l98.773438-148.265625-98.773438-148.269531c-2.34375-3.199219-3.625-7.464844-3.625-11.730469 0-11.734375 9.601562-21.335938 21.332031-21.335938h64c7.46875 0 13.867188 3.839844 17.707031 9.601563l106.667969 160c2.347657 3.199218 3.625 7.464844 3.625 11.734375zm0 0"
                fill="#42a5f5"/>
              <path
                d="m426.667969 181.667969c0 4.265625-1.28125 8.53125-3.628907 11.730469l-106.664062 160c-3.839844 5.761718-10.242188 9.601562-17.707031 9.601562h-64c-11.734375 0-21.335938-9.601562-21.335938-21.332031 0-4.269531 1.28125-8.535157 3.628907-11.734375l98.773437-148.265625-98.773437-148.269531c-2.347657-3.199219-3.628907-7.464844-3.628907-11.730469 0-11.734375 9.601563-21.335938 21.335938-21.335938h64c7.464843 0 13.867187 3.839844 17.707031 9.601563l106.664062 160c2.347657 3.199218 3.628907 7.464844 3.628907 11.734375zm0 0"
                fill="#2196f3"/>
            </svg>
          </Box>
        </Button>
      </Flex>
      <Box sx={{
        position: "relative",
        maxHeight: isOpen ? "100%" : 0,
        transition: ".5s",
        zIndex: 1,
        marginTop: '1rem'
      }}>
        {products.length > 0 &&
        <Table variant="striped" colorScheme="telegram.300">
          <Thead>
            <Tr>
              <Th>Картинка</Th>
              <Th>Название</Th>
              <Th textAlign={"right"} isNumeric>Количество</Th>
              <Th textAlign={"left"} isNumeric>Цена</Th>
              <Th textAlign={"right"} isNumeric>Итого</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products.map((item: any, key) =>
              <Tr key={key}>
                <Td>
                  <Image
                    sx={{width: '5rem', height: '5rem', borderRadius: '.75rem'}}
                    src={item.product.preview_img.path}/>
                </Td>
                <Td>{item.product.title}</Td>
                <Td textAlign={"right"} fontWeight={"600"}>{item.count}</Td>
                <Td textAlign={"left"} isNumeric>
                  <Text fontSize="1.25rem" fontWeight={"600"}>
                    {item.product.cost}
                  </Text>
                </Td>
                <Td textAlign={"right"} isNumeric>
                  <Text fontSize="1.625rem" color="green" fontWeight={"600"}>
                    {item.total_value}
                  </Text>
                </Td>
              </Tr>
            )}

          </Tbody>
        </Table>
        }
        <Divider/>
        <Flex justifyContent={"flex-end"} py={2}>
          <Text fontSize={"1.25rem"} fontWeight={"600"}>Итого: <Text as={'span'} color={"green"}
                                                                     fontWeight={"600"}>{amount}</Text></Text>
        </Flex>
      </Box>
    </Block>
  )
}

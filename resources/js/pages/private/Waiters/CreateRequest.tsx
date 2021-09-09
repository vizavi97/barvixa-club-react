import React, {useEffect, useMemo, useState} from 'react'
import {MainInterface, RequestFoodInterface, sameProductCheckedInterface} from "../../../intefaces/request";
import axios from "axios";
import {BACKEND_API_URL} from "../../../config/app.config";
import {Box, Button, Flex, Grid, GridItem, Image, Link, Text} from "@chakra-ui/react";
import {Block} from "../../../config/ui/Block";

interface CreateRequestInterface {
  isCreate: boolean,
  changeCreateState: () => void;
}

export const CreateRequest: React.FC<CreateRequestInterface> = ({isCreate, changeCreateState}) => {
  const [info, setInfo] = useState<any>(null)
  const [state, setState] = useState<MainInterface>({
    hallId: null,
    placeId: null,
    categoryId: null,
    request: [],
    amount: 0
  });
  useEffect(() => {
    axios.get(`${BACKEND_API_URL}info`)
      .then(resp => setInfo(() => resp.data))
      .catch(err => console.error(err))
  }, [])
  const changeStateHandler = (name: keyof MainInterface, id: number | string): void => {
    if (name === "hallId" && !info.places.hasOwnProperty(id)) {
      return setState((state: any) => ({
        ...state,
        [name]: null
      }))
    }
    return setState((state: any) => ({
      ...state,
      [name]: id
    }))
  }
  const addToBasketHandler = (item: RequestFoodInterface) => {
    const sameProductChecked = {
      isSame: false,
      key: null
    } as sameProductCheckedInterface;
    state.request.forEach((stateItem: RequestFoodInterface, key: number) => {
      if (item.id === stateItem.id) {
        sameProductChecked.isSame = true
        sameProductChecked.key = key
      }
    })
    if (sameProductChecked.isSame) {
      setState((state: MainInterface) => ({
        ...state,
        [state.request[sameProductChecked.key ?? 0].count]: ++state.request[sameProductChecked.key ?? 0].count
      }))
    } else {
      setState((state) => ({
        ...state,
        request: [...state.request, {
          title: item.title,
          id: item.id,
          count: 1,
          cost: item.cost
        } as RequestFoodInterface]
      }))
    }
  }
  const deleteFoodFromRequestHandler = (id: number) => setState((thisState: MainInterface) => ({
    ...thisState,
    request: thisState.request.filter((filterItem) => filterItem.id !== id)
  }))
  const incrementFoodCountFromRequestHandler = (id: number) => {
    setState((state: MainInterface) => ({
      ...state,
      request: state.request.map((item: RequestFoodInterface) => {
        if (item.id === id && item.count < 9) {
          item.count++
          return item
        }
        return item
      })
    }))
  }
  const decrementFoodCountFromRequestHandler = (id: number) => {
    setState((state: MainInterface) =>
      ({
        ...state,
        request: state.request.map((item: RequestFoodInterface) => {
          if (item.id === id && item.count > 1) {
            item.count--
            return item
          }
          return item
        })
      }))
  }
  // @ts-ignore
  const result = useMemo(() => state.request.length > 0 ? state.request.reduce(
    (accumulator: number, currentItem: RequestFoodInterface) => accumulator += currentItem.cost * currentItem.count, 0)
    : 0, [state])
  const cancelHandler = (): void => {
    setState(() => ({
      hallId: null,
      placeId: null,
      categoryId: null,
      request: [],
      amount: 0
    }))
  }
  const submitHandler = (): void => {
    axios.post(`${BACKEND_API_URL}request/create`, {
      data: state.request,
      place_id: state.placeId,
      hall_id: state.hallId,
      user_token: localStorage.getItem('token')
    })
      .then(() => {
        cancelHandler()
        changeCreateState();
      })
      .catch(err => console.log('request error :', err))
  }
  return (
    <Flex>
      <Flex flex={1} flexDirection={"column"}>
        {isCreate && info &&
        <Box pt={4}>
          <Flex flexDirection={"column"}>
            <Grid
              templateColumns={{base: 'repeat(1, 1fr)', md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)"}}
              gap={6}>
              {info.halls.map((item: any, key: number) =>
                <GridItem
                  d={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  key={key}
                >
                  <Button
                    width={'10rem'}
                    height={'10rem'}
                    onClick={() => changeStateHandler("hallId", item.id)}
                  >
                    <Text textAlign={"center"}>{item.title}</Text>
                  </Button>
                </GridItem>
              )}
            </Grid>
          </Flex>
        </Box>}
        {isCreate && state.hallId &&
        <Box pt={8}>
          <Flex flexDirection={"column"}>
            <Text fontWeight={600}>Выберете посадочное место</Text>
            <Flex
              flexWrap={"wrap"}
              pt={4}
            >
              {info.places[state.hallId].map((item: any, key: number) =>
                <Button
                  key={key}
                  height={'60px'}
                  w={"60px"}
                  mx={4}
                  cursor={item.is_busy === 1 ? "not-allowed" : "pointer"}
                  background={item.is_busy === 1 ? "red.200" : "green.400"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  isDisabled={item.is_busy === 1}
                  onClick={item.is_busy === 1 ? () => {} : () => changeStateHandler("placeId", item.id)}
                >
                  <Text>{item.number}</Text>
                </Button>
              )}
            </Flex>
          </Flex>
        </Box>
        }
        {isCreate && state.placeId &&
        <Box pt={8}>
          <Flex flexDirection={"column"}>
            <Text fontWeight={600}>Выберете категорию меню</Text>
            <Flex
              flexWrap={"wrap"}
              pt={4}
            >
              {info.food_categories.map((item: any, key: number) =>
                <Button
                  key={key}
                  height={'60px'}
                  mx={4}
                  background={"blue.300"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  marginBottom={4}
                  onClick={() => changeStateHandler("categoryId", item.id)}
                >
                  {item.preview_img ? <Image src={item.preview_img.path}
                                             w={10}
                                             h={10}
                                             borderRadius={"50%"}
                                             marginRight={4}
                  /> : null}
                  {item.title}
                </Button>
              )}
            </Flex>
          </Flex>
        </Box>
        }
        {isCreate && state.placeId && state.categoryId &&
        <Box pt={8}>
          <Flex flexDirection={"column"}>
            <Text fontWeight={600}>Выберете товарную позицию</Text>
            <Flex
              flexWrap={"wrap"}
              pt={4}
            >
              {info.food.filter((item: any) => item.category_id === state.categoryId).map((item: any, key: number) =>
                <Flex flexDirection={"column"}
                      textAlign={"center"}
                      marginBottom={4}
                      w={'140px'}
                      overflow={"hidden"}
                      mx={4}
                      key={key}
                >
                  <Button
                    d={"flex"}
                    flexDirection={"column"}
                    background={"blue.300"}
                    marginBottom={2}
                    w={'100%'}
                    h={'120px'}
                    p={0}
                    onClick={() => addToBasketHandler(item)}
                  >
                    <Text as={'h6'} w={'calc(100% - .5rem)'} whiteSpace={"break-spaces"}>{item.title}</Text>
                    <Text as={'h5'} fontWeight={600}
                          w={'calc(100% - .5rem)'} whiteSpace={"break-spaces"}
                          fontSize={"120%"}>{item.cost.toLocaleString()} сум</Text>

                  </Button>
                </Flex>
              )}
            </Flex>
          </Flex>
        </Box>
        }
      </Flex>
      {isCreate && <Block width={"400px"} minW={"400px"} minH={"calc(100vh - 2rem)"} p={4}>
        <Text textAlign={"center"} fontWeight={600} fontSize={'1.25rem'}>Заявка</Text>
        {state.hallId && info.halls.map((item: any, key: number) => item.id === state.hallId ?
          <Flex key={key} justifyContent={"space-between"}>
            <Text>Зал:</Text>
            <Box sx={{
              flex: "1 0",
              borderBottom: "1px dotted #000",
              height: "1em",
              margin: "0 .4em"
            }}/>
            <Text as={'h5'} fontWeight={600} fontSize={'1.25rem'}>{item.title}</Text>
          </Flex> : null)}
        {state.placeId && info.all_places.map((item: any, key: number) => item.id === state.placeId ?
          <Flex key={key} justifyContent={"space-between"}>
            <Text>Стол:</Text>
            <Box sx={{
              flex: "1 0",
              borderBottom: "1px dotted #000",
              height: "1em",
              margin: "0 .4em"
            }}/>
            <Text as={'h5'} fontWeight={600} fontSize={'1.25rem'}>{item.number}</Text>
          </Flex> : null)}
        <Text textAlign={"center"} fontWeight={600} fontSize={'1.25rem'}>Счет</Text>
        {state.request && state.request.map((item: RequestFoodInterface, key: number) => <Flex key={key}
                                                                                               flexDirection={"column"}>
          <Flex justifyContent={"space-between"}>
            <Text>{item.title}</Text>
            <Box sx={{
              flex: "1 0",
              borderBottom: "1px dotted #000",
              height: "1em",
              margin: "0 .4em"
            }}/>
            <Text as={'h5'} fontWeight={600} fontSize={'1.25rem'}>{item.cost.toLocaleString()}</Text>
          </Flex>
          <Flex borderBottom={'1px solid #33333330'}
                mb={2}
                pb={2}
                justifyContent={"space-between"}
                alignItems={"center"}>
            <Flex
              alignItems={"center"}
            >
              <Link mr={2} onClick={() => deleteFoodFromRequestHandler(item.id)}>❌</Link>
              <Button onClick={() => decrementFoodCountFromRequestHandler(item.id)}>➖</Button>
              <Text as={'h5'} fontWeight={600} fontSize={'1.25rem'} px={4}>{item.count}</Text>
              <Button onClick={() => incrementFoodCountFromRequestHandler(item.id)}>➕</Button>
            </Flex>
            <Text as={'h5'} fontWeight={600}
                  fontSize={'1.25rem'}>итого: {(item.cost * item.count).toLocaleString()}</Text>
          </Flex>
        </Flex>)}
        {state.request && state.request.length > 0 &&
        <Flex flexDirection={"column"}>
          <Flex justifyContent={"space-between"}>
            <Text>Итогавая сумма за заказ:</Text>
            <Box sx={{
              flex: "1 0",
              borderBottom: "1px dotted #000",
              height: "1em",
              margin: "0 .4em"
            }}/>
            <Text as={'h5'} fontWeight={600}
                  fontSize={'1.25rem'}>{result.toLocaleString()}</Text>
          </Flex>
          <Flex justifyContent={"center"}>
            <Button variant={"outline"} colorScheme={"teal"} onClick={submitHandler}>Отправить на обработку</Button>
            <Button variant={"outline"} colorScheme={"orange"} ml={2} onClick={cancelHandler}>Сбросить</Button>
          </Flex>
        </Flex>
        }
      </Block>}
    </Flex>
  )
}

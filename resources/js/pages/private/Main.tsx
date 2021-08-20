import React, {useEffect, useMemo, useState} from 'react'
import {Block} from "../../config/ui/Block";
import {Box, Button, Flex, Text, Image, Grid, GridItem, Link} from "@chakra-ui/react";
import axios from "axios";
import {BACKEND_API_URL} from "../../config/app.config";
import {MainInterface, RequestFoodInterface, sameProductCheckedInterface} from "../../intefaces/request";


export const Main: React.FC = () => {
  const [createRequest, setCreateRequest] = useState<boolean>(false)
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
    let keyFromArr = 1;
    state.request.forEach((item: RequestFoodInterface, key: number) => item.id === id ? keyFromArr = key : 1)
    setState((state: MainInterface) => ({
      ...state,
      [state.request[keyFromArr].count]: ++state.request[keyFromArr].count
    }))
  }
  const decrementFoodCountFromRequestHandler = (id: number) => {
    let keyFromArr = 1;
    if (state.request[keyFromArr].count > 1) {
      state.request.forEach((item: RequestFoodInterface, key: number) => item.id === id ? keyFromArr = key : 1)
      setState((state: MainInterface) => ({
        ...state,
        [state.request[keyFromArr].count]: --state.request[keyFromArr].count
      }))
    }
  }
  // @ts-ignore
  const result = useMemo(() => state.request.length ? state.request.reduce(
    (accumulator: number, currentItem: RequestFoodInterface) => accumulator += currentItem.cost * currentItem.count, 0)
    : 0, [state])
  return (
    <Flex>
      <Block flex={1}>
        <Box py={4} px={8}>
          <Flex justifyContent={"space-between"}>
            <Text as='h2' fontSize={'1.75rem'} fontWeight={700} textAlign={"left"}>
              Заявки
            </Text>
            <Box>
              {!createRequest &&
              <Button variant={"outline"}
                      colorScheme={"twitter"}
                      onClick={() => setCreateRequest(() => true)}
              >
                оформить заявку
              </Button>

              }
              {createRequest &&
              <Button variant={"outline"}
                      colorScheme={"red"}
                      onClick={() => {
                        setCreateRequest(() => false)
                        Object.keys(state).forEach((index: string) => setState((prevState: MainInterface) =>
                          ({
                            ...prevState,
                            [index as keyof MainInterface]: index === "request" ? [] : null
                          })
                        ))
                      }}
              >
                Отменить заявку
              </Button>
              }
            </Box>
          </Flex>
          {createRequest && info &&
          <Box pt={4}>
            <Flex flexDirection={"column"}>
              <Text fontWeight={600}>Выберете зал</Text>
              <Grid
                templateColumns={{base: 'repeat(1, 1fr)', md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)"}}
                gap={6}>
                {info.halls.map((item: any, key: number) =>
                  <GridItem
                    key={key}
                    height={'240px'}
                    onClick={() => changeStateHandler("hallId", item.id)}
                  >
                    <Text textAlign={"center"}>{item.title}</Text>
                    <Image src={item.preview_img.path}
                           sx={{
                             objectFit: 'cover',
                             h: '100%',
                             w: '100%',
                             borderRadius: '.5rem',
                             padding: '.5rem',
                             border: item.id === state.hallId ? "3px solid rgba(122,122,122, 2)" : 0
                           }}
                           _hover={{boxShadow: '0 0 10px 3px rgba(122,122,122,.3)'}}
                    />
                  </GridItem>
                )}
              </Grid>
            </Flex>
          </Box>}
          {createRequest && state.hallId &&
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
                    background={"green.400"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    onClick={() => changeStateHandler("placeId", item.id)}
                  >
                    <Text>{item.number}</Text>
                  </Button>
                )}
              </Flex>
            </Flex>
          </Box>
          }
          {createRequest && state.placeId &&
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
                    <Image src={item.preview_img.path}
                           w={10}
                           h={10}
                           borderRadius={"50%"}
                           marginRight={4}
                    />
                    {item.title}
                  </Button>
                )}
              </Flex>
            </Flex>
          </Box>
          }
          {createRequest && state.placeId && state.categoryId &&
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
                        w={'180px'}
                        overflow={"hidden"}
                        mx={4}
                        key={key}
                  >
                    <Button
                      height={'60px'}
                      background={"blue.300"}
                      marginBottom={2}
                      w={'100%'}
                      h={'160px'}
                      minHeight={'160px'}
                      p={0}
                      onClick={() => addToBasketHandler(item)}
                    >
                      <Image src={item.preview_img.path}
                             objectFit={'cover'}
                             height={'100%'}
                             width={'100%'}
                             borderRadius={4}
                      />
                    </Button>
                    <Text as={'h6'}>{item.title} - <Text as={'strong'} fontWeight={600}
                                                         fontSize={"120%"}>{item.cost.toLocaleString()} сум</Text></Text>
                  </Flex>
                )}
              </Flex>
            </Flex>
          </Box>
          }
        </Box>
      </Block>
      {createRequest &&
      <Block width={"400px"} p={4}>
        <Text textAlign={"center"} fontWeight={600} fontSize={'1.25rem'}>Заявка</Text>
        {state.hallId && <Flex justifyContent={"space-between"}>
          <Text>Зал:</Text>
          <Box sx={{
            flex: "1 0",
            borderBottom: "1px dotted #000",
            height: "1em",
            margin: "0 .4em"
          }}/>
          <Text as={'h5'} fontWeight={600} fontSize={'1.25rem'}>{state.hallId}</Text>
        </Flex>}
        {state.placeId && <Flex justifyContent={"space-between"}>
          <Text>Стол:</Text>
          <Box sx={{
            flex: "1 0",
            borderBottom: "1px dotted #000",
            height: "1em",
            margin: "0 .4em"
          }}/>
          <Text as={'h5'} fontWeight={600} fontSize={'1.25rem'}>{state.placeId}</Text>
        </Flex>}
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
        {state.request && <Flex justifyContent={"space-between"}>
          <Text>Итогавая сумма за заказ:</Text>
          <Box sx={{
            flex: "1 0",
            borderBottom: "1px dotted #000",
            height: "1em",
            margin: "0 .4em"
          }}/>
          <Text as={'h5'} fontWeight={600}
                fontSize={'1.25rem'}>{result.toLocaleString()}</Text>
        </Flex>}
      </Block>
      }
    </Flex>
  )
}

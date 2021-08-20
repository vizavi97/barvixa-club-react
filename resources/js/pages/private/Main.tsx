import React, {useEffect, useState} from 'react'
import {Block} from "../../config/ui/Block";
import {Box, Button, Flex, Text, Image, Grid, GridItem} from "@chakra-ui/react";
import axios from "axios";
import {BACKEND_API_URL} from "../../config/app.config";
import {RequestInterface} from "../../intefaces/request";
import {resetObject} from "../../tools/functions/reset.object";


interface MainInterface {
}


export const Main: React.FC<MainInterface> = () => {
  const [createRequest, setCreateRequest] = useState<boolean>(false)
  const [info, setInfo] = useState<any>(null)
  const [places, setPlaces] = useState<any>(null)
  const [request, setRequest] = useState<RequestInterface>({
    hallId: null,
    placeId: null
  })
  useEffect(() => {
    axios.get(`${BACKEND_API_URL}info`)
      .then(resp => setInfo(() => resp.data))
      .catch(err => console.error(err))
  }, [])
  const changeHallHandler = (id: number) => {
    setRequest(state => ({...state, hallId: id}))
    if (id in info.places) {
      setPlaces(() => info.places[id])
    } else {
      setPlaces(() => null)
    }
  }
  const changeCategory = () => {
   console.log('qweqweqweqweqw')
  }
  console.log("places", places)
  return (
    <>
      <Block>
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
                    onClick={() => changeHallHandler(item.id)}
                  >
                    <Text textAlign={"center"}>{item.title}</Text>
                    <Image src={item.preview_img.path}
                           sx={{
                             objectFit: 'cover',
                             h: '100%',
                             w: '100%',
                             borderRadius: '.5rem',
                             padding: '.5rem',
                             border: item.id === request.hallId ? "3px solid rgba(122,122,122, 2)" : 0
                           }}
                           _hover={{boxShadow: '0 0 10px 3px rgba(122,122,122,.3)'}}
                    />
                  </GridItem>
                )}
              </Grid>
            </Flex>
          </Box>}

          {createRequest && places &&
          <Box pt={8}>
            <Flex flexDirection={"column"}>
              <Text fontWeight={600}>Выберете посадочное место</Text>
              <Flex
                flexWrap={"wrap"}
                pt={4}
              >
                {places.map((item: any, key: number) =>
                  <Button
                    key={key}
                    height={'60px'}
                    w={"60px"}
                    mx={4}
                    background={"green.400"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Text>{item.number}</Text>
                  </Button>
                )}
              </Flex>
            </Flex>
          </Box>
          }


          {createRequest && places &&
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
                    onClick={changeCategory}
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

          {createRequest && places &&
          <Box pt={8}>
            <Flex flexDirection={"column"}>
              <Text fontWeight={600}>Выберете товарную позицию</Text>
              <Flex
                flexWrap={"wrap"}
                pt={4}
              >
                {info.food.map((item: any, key: number) =>
                  <Button
                    key={key}
                    height={'60px'}
                    mx={4}
                    background={"blue.300"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    marginBottom={4}
                    w={'200px'}
                    h={'200px'}
                    minHeight={'200px'}
                  >
                    <Image src={item.preview_img.path}
                           objectFit={'cover'}
                           height={'100%'}
                           width={'100%'}
                    />
                  </Button>
                )}
              </Flex>
            </Flex>
          </Box>
          }


        </Box>
      </Block>
    </>
  )
}

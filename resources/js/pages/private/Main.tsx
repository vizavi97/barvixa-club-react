import React, {useState} from 'react'
import {Block} from "../../config/ui/Block";
import {Box, Button, Flex, Text, Image, Grid, GridItem, Link} from "@chakra-ui/react";
import {CreateRequest} from "./Waiters/CreateRequest";
import {ListRequest} from "./Waiters/ListRequest";
import {useDispatch} from "react-redux";
import {logOutUser} from "../../store/actions/user.action";


export const Waiter: React.FC = () => {
  const [createRequest, setCreateRequest] = useState<boolean>(true)
  const dispatch = useDispatch();
  return (
    <>
      {/*<Block flex={1}>*/}
      {/*  <Box py={4} px={8}>*/}
      {/*    <Flex justifyContent={"space-between"}>*/}
      {/*      <Button onClick={() => dispatch(logOutUser())}>Выйти</Button>*/}
      {/*      <Text as='h2' fontSize={'1.75rem'} fontWeight={700} textAlign={"left"}>*/}
      {/*        Заявки*/}
      {/*      </Text>*/}
      {/*      <Box>*/}
      {/*        {!createRequest &&*/}
      {/*        <Button variant={"outline"}*/}
      {/*                colorScheme={"twitter"}*/}
      {/*                onClick={() => setCreateRequest(() => true)}*/}
      {/*        >*/}
      {/*          оформить заявку*/}
      {/*        </Button>*/}

      {/*        }*/}
      {/*        {createRequest &&*/}
      {/*        <Button variant={"outline"}*/}
      {/*                colorScheme={"red"}*/}
      {/*                onClick={() => setCreateRequest(() => false)}*/}
      {/*        >*/}
      {/*          Отменить заявку*/}
      {/*        </Button>*/}
      {/*        }*/}
      {/*      </Box>*/}
      {/*    </Flex>*/}
      {/*  </Box>*/}
      {/*</Block>*/}
      <CreateRequest isCreate={createRequest}
                     changeCreateState={() => setCreateRequest(state => !state)}
      />
      <ListRequest isCreate={createRequest}/>
    </>
  )
}

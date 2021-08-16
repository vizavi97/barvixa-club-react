import React from 'react'
import {Block} from "../../../config/ui/Block";
import {Avatar, Box, Flex, Grid, GridItem, Link, Text} from "@chakra-ui/react";
import {EmailIcon, PhoneIcon} from "@chakra-ui/icons";


interface UserProfileInterface {
    name: string
    phone: string
    email: string
}

export const UserProfile: React.FC<UserProfileInterface> = ({
                                                                name,
                                                                phone,
                                                                email
                                                            }) => {
    return (
        <Block p="1.25rem">
            <Grid
                templateColumns={{
                    base: 'repeat(1, 1fr)',
                    md: "repeat(2, 1fr)",
                    lg: "repeat(3, 1fr)"
                }}
                gap={6}>

                <GridItem colSpan={1}>
                    <Flex alignItems={"center"}>
                        <Box pr={"1rem"}>
                            <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence"/>
                        </Box>
                        <Box>
                            <Text as={'h2'} fontWeight={700} fontSize={'1.125rem'}>{name}</Text>
                        </Box>
                    </Flex>
                </GridItem>
                <GridItem colSpan={1}>
                    <Flex alignItems={"center"}>
                        <Link d={'flex'} alignItems='center' justifyContent='center' bg='#213362' w={'56px'} h={'56px'}
                              borderRadius="50%"
                              href={"tel:" + phone}
                              _hover={{bg: "#21336240"}}

                        >
                            <PhoneIcon color='#0065EF'/>
                        </Link>
                        <Box pl={"1rem"}>
                            <Text as={'h6'} fontSize={'0.875rem'} color='#A2ABCA'>Телефон</Text>
                            <Text as={'h6'} fontSize={'0.875rem'} color='#A2ABCA'><Link
                                href={"tel:" + phone}>{phone}</Link></Text>
                        </Box>
                    </Flex>
                </GridItem>
                <GridItem colSpan={1}>
                    <Flex alignItems={"center"}>
                        <Link d={'flex'} alignItems='center' justifyContent='center' bg='#3C1D2E' w={'56px'} h={'56px'}
                              borderRadius="50%"
                              href={"malito:" + email}
                              _hover={{bg: "#3C1D2E80"}}
                        >
                            <EmailIcon color='#EB335E'/>
                        </Link>
                        <Box pl={"1rem"}>
                            <Text as={'h6'} fontSize={'0.875rem'} color='#A2ABCA'>Email</Text>
                            <Text as={'h6'} fontSize={'0.875rem'} color='#A2ABCA'><Link
                                href={"malito:" + email}>{email}</Link></Text>
                        </Box>
                    </Flex>
                </GridItem>

            </Grid>
        </Block>
    )
}

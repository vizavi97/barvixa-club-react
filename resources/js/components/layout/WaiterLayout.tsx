import React from 'react'
import {Box, Flex} from '@chakra-ui/react';

export const WaiterLayout: React.FC = ({children}) => {
  return (
    <Flex>
      <Flex flexDirection={'column'}
            minH='100vh'
            flex={1}
            position={'relative'}
            overflowX='hidden'
      >
        {/*<TopBar/>*/}
        <Flex flexDirection={'column'} px={'1.25rem'} py={'0.75rem'}>
          {children}
        </Flex>
      </Flex>
    </Flex>
  )
};

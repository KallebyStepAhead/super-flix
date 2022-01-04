import React from 'react';
import { Flex } from '@chakra-ui/react';
import { NavLinks } from './NavLinks';
import { NavOptions } from './NavOptions';

export function NavBar() {
  return (
    <Flex
      px={16}
      justifyContent="space-between"
    >
      <NavLinks />

      <NavOptions />
    </Flex>
  );
}

import React from 'react';
import { Avatar, HStack, IconButton } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';

export function NavOptions() {
  return (
    <HStack
      gap={8}
    >
      <IconButton
        w={6}
        h={6}
        as={FiSearch}
        aria-label="Search"
        variant="unstyled"
        cursor="pointer"
      />

      <Avatar
        size="sm"
        name="Kalleby Santos"
        src="https://github.com/KallebyStepAhead.png"
      />
    </HStack>
  );
}

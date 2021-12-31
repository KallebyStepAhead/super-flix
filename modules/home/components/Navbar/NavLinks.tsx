import React from 'react';
import { HStack, Link } from '@chakra-ui/react';

export function NavLinks() {
  return (
    <HStack
      gap={8}
      color="white"
      fontSize={16}
      fontWeight="semibold"
      textTransform="uppercase"
    >
      <Link href="#">Dashboard</Link>
      <Link href="#">Movies</Link>
      <Link href="#">Series</Link>
      <Link href="#">Kids</Link>
    </HStack>
  );
}

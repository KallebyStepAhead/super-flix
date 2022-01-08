import React from 'react';
import NextLink from 'next/link';
import {
  HStack, Icon, Link, Text,
} from '@chakra-ui/react';
import { FiArrowLeft } from 'react-icons/fi';

export function GoBackLink() {
  return (
    <NextLink href="/">
      <Link>
        <HStack alignItems="center">
          <Icon
            as={FiArrowLeft}
            w={6}
            h={6}
          />

          <Text>Back to main Dashboard</Text>
        </HStack>
      </Link>
    </NextLink>
  );
}

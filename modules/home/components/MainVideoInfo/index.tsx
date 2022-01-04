import React from 'react';
import {
  Button,
  Text, VStack,
} from '@chakra-ui/react';
import { Video } from '../../schemas/video';

type MainVideoInfoProps = {
  data: Video
}

export function MainVideoInfo({ data }: MainVideoInfoProps) {
  return (
    <VStack
      maxW="container.sm"
      px={16}
      gap={8}
      alignItems="flex-start"
    >
      <Text
        fontSize="6xl"
        fontWeight="bold"
        lineHeight={1}
        letterSpacing="wide"
        textTransform="uppercase"
      >
        {data.title}
      </Text>

      <Button
        px={16}
        rounded="2xl"
        textTransform="uppercase"
        transition="all .2s ease-in-out"
        bgColor="purple.600"
        _hover={{
          bgColor: 'purple.400',
        }}
      >
        Play
      </Button>
    </VStack>
  );
}

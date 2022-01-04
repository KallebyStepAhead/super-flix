import React from 'react';
import {
  List, Text, VStack,
} from '@chakra-ui/react';
import { Video } from '../../schemas/video';
import { VideoItem } from './VideoItem';

type ListSectionProps = {
  data: Video[]
  title?: string
}

export function ListSection({ data, title }: ListSectionProps) {
  return (
    <VStack
      paddingLeft={16}
      maxW="full"
      alignItems="flex-start"
    >
      {
        title && (
          <Text
            fontWeight="bold"
            letterSpacing="wide"
            textTransform="uppercase"
          >
            {title}
          </Text>
        )
      }

      <List
        display="flex"
        gap={8}
      >
        {
          data.map((video) => (
            <VideoItem
              key={video.id}
              data={video}
            />
          ))
        }
      </List>
    </VStack>
  );
}

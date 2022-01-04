import { Image, ListItem } from '@chakra-ui/react';
import React from 'react';
import { Video } from '../../schemas/video';

type VideoItemProps = {
  data: Video
}

export function VideoItem({ data }: VideoItemProps) {
  return (
    <ListItem
      cursor="pointer"
    >
      <Image
        src={data.thumbnail.url}
        maxW={32}
        rounded="md"
      />
    </ListItem>
  );
}

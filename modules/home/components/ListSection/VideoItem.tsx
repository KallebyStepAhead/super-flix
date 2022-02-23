import { Image, ListItem } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { IVideoParams } from '../../../../pages/app/video/[id]';
import { Video } from '../../schemas/video';

type VideoItemProps = {
  data: Video
}

export function VideoItem({ data }: VideoItemProps) {
  const router = useRouter();

  function goToVideoPage() {
    const query: IVideoParams = {
      id: data.id,
    };

    router.push({
      pathname: '/app/video/[id]',
      query,
    });
  }

  return (
    <ListItem
      cursor="pointer"
      onClick={goToVideoPage}
    >
      <Image
        src={data.thumbnail.url}
        maxW={32}
        rounded="md"
      />
    </ListItem>
  );
}

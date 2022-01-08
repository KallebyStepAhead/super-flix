import React from 'react';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import {
  Container, SimpleGrid, Spacer, VStack,
} from '@chakra-ui/react';
import { ParsedUrlQuery } from 'querystring';
import { Video } from '../../modules/video/schemas/video';
import { getVideos } from '../../modules/video/functions/getVideos';
import { getVideoById } from '../../modules/video/functions/getVideoById';
import { VideoDetails } from '../../modules/video/components/VideoDetails';
import { GoBackLink } from '../../modules/video/components/GoBackLink';

export type IVideoParams = ParsedUrlQuery & {
  id: string
}

type VideoPageProps = {
  data: Video
}

type VideoPageStaticProps = {
  data: Video | null
}

const VideoPage: NextPage<VideoPageProps> = ({ data }) => (
  <Container
    py={8}
    px={16}
    h="100vh"
    maxW="full"
    background={`
        linear-gradient(to right, black 30%, transparent),
        url(${data.secondaryBackground.url})
      `}
    bgPosition="right"
    bgSize="contain"
  >
    <SimpleGrid columns={2}>
      <VStack
        alignItems="left"
        gap={8}
        h="full"
      >
        <GoBackLink />

        <Spacer />

        <VideoDetails data={data} />
      </VStack>
    </SimpleGrid>
  </Container>
);

export default VideoPage;

export const getStaticPaths: GetStaticPaths<IVideoParams> = async () => {
  const { videos } = await getVideos();

  const paths = videos.map((video) => ({
    params: {
      id: video.id,
    },
  }));

  return {
    paths,
    fallback: true,
  };
};

type VideoPageGetStaticProps = GetStaticProps<VideoPageStaticProps, IVideoParams>
export const getStaticProps: VideoPageGetStaticProps = async (context) => {
  const videoId = context.params?.id;

  const { video } = await getVideoById(videoId || '');

  if (!video) {
    return {
      redirect: {
        destination: '/',
      },
      props: {
        data: null,
      },
    };
  }

  return {
    props: {
      data: video,
    },
    revalidate: 3600 * 8,
  };
};

import React from 'react';
import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import { Container, Flex, Spacer } from '@chakra-ui/react';
import { Video } from '../modules/home/schemas/video';
import { getVideos } from '../modules/home/functions/getVideos';
import { getLastVideo } from '../modules/home/functions/getLastVideo';
import { NavBar } from '../modules/home/components/Navbar';
import { MainVideoInfo } from '../modules/home/components/MainVideoInfo';
import { ListSection } from '../modules/home/components/ListSection';

type HomeProps = {
  videos: Video[]
  lastVideo: Video
}

const Home: NextPage<HomeProps> = ({ videos, lastVideo }) => (
  <Container
    py={8}
    h="100vh"
    maxW="full"
    background={`
        linear-gradient(to bottom, transparent, black),
        url(${lastVideo.primaryBackground.url})
      `}
    bgPosition="center"
    bgSize="cover"
  >
    <Head>
      <title>Home - SuperFLIX</title>
      <meta name="description" content="SuperFlix, watch the best films and series online" />
    </Head>

    <Flex
      h="full"
      w="full"
      gap={8}
      flexDirection="column"
    >
      <NavBar />

      <Spacer />

      <MainVideoInfo
        data={lastVideo}
      />

      <ListSection
        title="My List"
        data={videos}
      />
    </Flex>
  </Container>
);

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const { videos } = await getVideos();
  const { lastVideo } = await getLastVideo();

  return {
    props: {
      videos,
      lastVideo,
    },
    revalidate: 3600 * 8, // 8 hours
  };
};

import React from 'react';
import type { NextPage, GetStaticProps } from 'next';
import Head from 'next/head';
import { Container } from '@chakra-ui/react';
import { Video } from '../modules/home/schemas/video';
import { getVideos } from '../modules/home/functions/getVideos';
import { getLastVideo } from '../modules/home/functions/getLastVideo';
import { NavBar } from '../modules/home/components/Navbar';

type HomeProps = {
  videos: Video[]
  lastVideo: Video
}

const Home: NextPage<HomeProps> = ({ lastVideo }) => {
  console.log(lastVideo);

  return (
    <Container
      p={0}
      maxW="container.xl"
      maxH="max"
    >
      <Head>
        <title>Home - SuperFLIX</title>
        <meta name="description" content="SuperFlix, watch the best films and series online" />
      </Head>

      <NavBar />

      {
        JSON.stringify(lastVideo)
      }

    </Container>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const { videos } = await getVideos();
  const { lastVideo } = await getLastVideo();

  return {
    props: {
      videos,
      lastVideo,
    },
  });
  };
};

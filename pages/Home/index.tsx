import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Container, Heading } from '@chakra-ui/react';

const Home: NextPage = () => (
  <Container
    p={0}
    maxW="container.xl"
  >
    <Head>
      <title>Home - SuperFLIX</title>
      <meta name="description" content="SuperFlix, watch the best films and series online" />
    </Head>

    <Heading>Welcome to SuperFlix!!</Heading>
  </Container>
);

export default Home;

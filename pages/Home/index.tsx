import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Container } from '@chakra-ui/react';
import { NavBar } from '../../modules/home/components/Navbar';

const Home: NextPage = () => (
  <Container
    p={0}
    maxW="container.xl"
  >
    <Head>
      <title>Home - SuperFLIX</title>
      <meta name="description" content="SuperFlix, watch the best films and series online" />
    </Head>

    <NavBar />

  </Container>
);

export default Home;

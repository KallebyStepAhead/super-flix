import React from 'react';
import type { NextPage } from 'next';
import { Container } from '@chakra-ui/react';
import Home from './Home';

const Index: NextPage = () => (
  <Container
    p={0}
    maxW="container.xl"
  >
    <Home />
  </Container>
);

export default Index;

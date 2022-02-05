import React, { useState } from 'react';
import NextLink from 'next/link';
import Axios, { AxiosError } from 'axios';
import type { GetStaticProps, NextPage } from 'next';
import {
  Button, Container, FormControl,
  FormLabel, Heading, Input, Link,
  SimpleGrid, Spacer, Text, VStack,
  FormErrorMessage,
} from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import { CoverVideo } from '../../modules/auth/schemas/coverVideo';
import { getCoverVideo } from '../../modules/auth/functions/getCoverVideo';
import { SignUpErrorResponse, SignUpResponse } from '../api/auth/signUp';

type SignUpPageProps = {
  coverVideo: CoverVideo
}

const SignUp: NextPage<SignUpPageProps> = ({ coverVideo }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignUp() {
    const data = {
      name,
      email,
      password,
    };

    Axios.post<SignUpResponse>('/api/auth/signUp', { data })
      .then(() => {
        signIn('credentials', { redirect: true, email, password });
      })
      .catch((error: Error | AxiosError<SignUpErrorResponse>) => {
        if (!Axios.isAxiosError(error)) return;

        if (!error.response) return;

        const { data: errors } = error.response;

        if (Array.isArray(errors)) {
          const errorsMessage = errors
            .map((item) => item.message)
            .join('\n');

          setErrorMessage(errorsMessage);
          return;
        }

        setErrorMessage(errors.message);
      });
  }

  return (
    <Container
      p={8}
      h="100vh"
      maxW="full"
      background={`
        linear-gradient(to left, black 15%, transparent),
        url(${coverVideo.background.url})
      `}
      bgPosition="left"
      bgSize="cover"
    >
      <SimpleGrid
        columns={2}
        h="full"
        gap={8}
        placeItems="center"
      >
        <Spacer />

        <VStack
          px={8}
          gap={8}
          alignItems="flex-start"
          w="sm"
        >
          <VStack
            gap={4}
            alignItems="flex-start"
          >
            <Heading>SignUp</Heading>

            <Text>
              Ready to watch the best movies?
            </Text>
          </VStack>

          <VStack
            w="full"
          >
            <FormControl>
              <FormLabel htmlFor="name">
                Username
              </FormLabel>
              <Input
                id="name"
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                focusBorderColor="purple.400"
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="email">
                Email Address
              </FormLabel>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                focusBorderColor="purple.400"
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">
                Password
              </FormLabel>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                focusBorderColor="purple.400"
              />
            </FormControl>
          </VStack>

          <FormControl isInvalid={!!errorMessage}>
            <Button
              px={16}
              w="full"
              rounded="2xl"
              textTransform="uppercase"
              onClick={handleSignUp}
              transition="all .2s ease-in-out"
              bgColor="purple.600"
              _hover={{
                bgColor: 'purple.400',
              }}
            >
              Continue
            </Button>

            {
              errorMessage && (
              <FormErrorMessage>
                {errorMessage}
              </FormErrorMessage>
              )
            }
          </FormControl>

          <Text>
            Already have an account?
            {' '}
            <NextLink href="/auth/signIn">
              <Link color="purple.400">SignIn</Link>
            </NextLink>
          </Text>
        </VStack>
      </SimpleGrid>
    </Container>
  );
};

export default SignUp;

export const getStaticProps: GetStaticProps<SignUpPageProps> = async () => {
  const { coverVideo } = await getCoverVideo();

  return {
    props: {
      coverVideo,
    },
    revalidate: 3600 * 8, // 8 hours
  };
};

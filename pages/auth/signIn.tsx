import React, { useState } from 'react';
import NextLink from 'next/link';
import { signIn as NextSignIn } from 'next-auth/react';
import type { GetStaticProps, NextPage } from 'next';
import {
  Button, Container, FormControl,
  FormLabel, Heading, Input, Link,
  SimpleGrid, Spacer, Text, VStack,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { CoverVideo } from '../../modules/auth/schemas/coverVideo';
import { getCoverVideo } from '../../modules/auth/functions/getCoverVideo';

type SignInPageProps = {
  coverVideo: CoverVideo
}

const SignIn: NextPage<SignInPageProps> = ({ coverVideo }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  async function handleSignIn() {
    const response = await NextSignIn<'credentials'>('credentials', { redirect: false, email, password });

    if (!response?.url && response?.error) {
      setErrorMessage(response.error);

      return;
    }

    router.push({ pathname: '/' });
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
        >
          <VStack
            gap={4}
            alignItems="flex-start"
          >
            <Heading>SignIn</Heading>

            <Text>
              Welcome back! Please login to your account
            </Text>
          </VStack>

          <VStack
            w="full"
          >
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
              onClick={handleSignIn}
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
            New user?
            {' '}
            <NextLink href="/auth/signUp">
              <Link color="purple.400">SignUp</Link>
            </NextLink>
          </Text>
        </VStack>
      </SimpleGrid>
    </Container>
  );
};

export default SignIn;

export const getStaticProps: GetStaticProps<SignInPageProps> = async () => {
  const { coverVideo } = await getCoverVideo();

  return {
    props: {
      coverVideo,
    },
    revalidate: 3600 * 8, // 8 hours
  };
};

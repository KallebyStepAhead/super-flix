import {
  AspectRatio, Grid, GridItem, Heading, Image, Text, VStack,
} from '@chakra-ui/react';
import React from 'react';
import { Video } from '../../schemas/video';

type VideoDetailsProps = {
  data: Video
}

export function VideoDetails({ data }: VideoDetailsProps) {
  return (
    <Grid
      maxW="full"
      templateColumns="repeat(3, 1fr)"
    >
      <GridItem>
        <AspectRatio
          w={40}
          ratio={16 / 24}
        >
          <Image
            maxW="full"
            rounded="md"
            alt="Thumbnail"
            objectFit="cover"
            src={data.thumbnail.url}
          />
        </AspectRatio>
      </GridItem>

      <GridItem colSpan={2}>
        <VStack alignItems="flex-start">
          <Heading
            fontSize="6xl"
            fontWeight="bold"
            letterSpacing="wide"
            textTransform="uppercase"
            marginTop="-4"
            noOfLines={2}
          >
            {data.title}
          </Heading>

          <Text noOfLines={4}>
            {data.description}
            {data.description}
            {data.description}
          </Text>
        </VStack>
      </GridItem>
    </Grid>
  );
}

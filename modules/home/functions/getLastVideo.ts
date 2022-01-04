import { gql, TypedDocumentNode } from '@apollo/client';
import client from '../../../shared/services/apollo';
import { Video } from '../schemas/video';

type GetLastVideoData = {
  videos: Video[]
}

type GetLastVideoResult = {
  lastVideo: Video
};

export const getVideosQuery: TypedDocumentNode<GetLastVideoData> = gql`
  query {
    videos(last: 1) {
      id
      title
      thumbnail {
        url
      }
      primaryBackground {
        url
      }
    }
  }
`;

export async function getLastVideo(): Promise<GetLastVideoResult> {
  const { data: { videos } } = await client.query({
    query: {
      ...getVideosQuery,
    },
  });

  return {
    lastVideo: videos[0] || undefined,
  };
}

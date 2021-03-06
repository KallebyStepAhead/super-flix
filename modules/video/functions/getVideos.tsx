import { gql, TypedDocumentNode } from '@apollo/client';
import client from '../../../shared/services/apollo';
import { Video } from '../schemas/video';

type GetVideosData = {
  videos: Video[]
}

type GetVideosResult = GetVideosData;

export const getVideosQuery: TypedDocumentNode<GetVideosData> = gql`
  query {
    videos (last: 10) {
      id
      title
      description
      thumbnail {
        url
      }
      videoContent {
        url
        mimeType
      }
      primaryBackground {
        url
      }
      secondaryBackground {
        url
      }
    }
  }
`;

export async function getVideos(): Promise<GetVideosResult> {
  const { data: { videos } } = await client.query({
    query: {
      ...getVideosQuery,
    },
  });

  return {
    videos,
  };
}

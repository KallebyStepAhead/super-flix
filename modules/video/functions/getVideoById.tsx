import { gql, TypedDocumentNode } from '@apollo/client';
import client from '../../../shared/services/apollo';
import { Video } from '../schemas/video';

type GetVideosByIdData = {
  video: Video | null
}

type GetVideoByIdVars = {
  id: string
}

type GetVideosResult = GetVideosByIdData

export const getVideosQuery: TypedDocumentNode<GetVideosByIdData, GetVideoByIdVars> = gql`
  query GetVideoById($id: ID!){
    video (where: { id: $id }) {
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
      secondaryBackground {
        url
      }
    }
  }
`;

export async function getVideoById(videoId: string): Promise<GetVideosResult> {
  const { data } = await client.query({
    variables: {
      id: videoId,
    },
    query: {
      ...getVideosQuery,
    },
  });

  return data;
}

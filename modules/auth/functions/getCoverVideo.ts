import { gql, TypedDocumentNode } from '@apollo/client';
import client from '../../../shared/services/apollo';
import { CoverVideo, VideoAsset } from '../schemas/coverVideo';

type Video = {
  secondaryBackground: VideoAsset
}

type GetCoverVideoData = {
  videos: Video[]
}

type GetCoverVideoResult = {
  coverVideo: CoverVideo
}

export const getCoverVideoQuery: TypedDocumentNode<GetCoverVideoData> = gql`
query {
  videos(orderBy: createdAt_DESC, first: 1) {
    secondaryBackground {
      url
    }
  }
}
`;

export async function getCoverVideo(): Promise<GetCoverVideoResult> {
  const { data: { videos } } = await client.query({
    query: {
      ...getCoverVideoQuery,
    },
  });

  const parsedResults = videos.map<CoverVideo>((video) => ({
    background: video.secondaryBackground,
  }));

  return {
    coverVideo: parsedResults[0] || undefined,
  };
}

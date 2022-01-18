export type VideoAsset = {
  url: string
}

export type MediaAsset = VideoAsset & {
  mimetype: 'video/mp4' | string
}

export type Video = {
  id: string,
  title: string
  description: string
  thumbnail: VideoAsset
  videoContent: MediaAsset
  primaryBackground: VideoAsset
  secondaryBackground: VideoAsset
}

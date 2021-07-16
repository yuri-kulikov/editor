export enum MediaType {
  Img = 'img',
  Video = 'video',
}

interface MyMedia {
  type: MediaType | undefined;
  src: string | undefined;
  alt: string | undefined;
  path: string | undefined;
}

export default MyMedia;

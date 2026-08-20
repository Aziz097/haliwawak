import Image, { type ImageProps } from 'next/image';

type PublicImageProps = Omit<ImageProps, 'src'> & { src: string };

/** Uses Vercel's optimizer for local assets and preserves external CMS URLs. */
export default function PublicImage({ src, alt, ...props }: PublicImageProps) {
  return <Image src={src} alt={alt} unoptimized={!src.startsWith('/')} {...props} />;
}

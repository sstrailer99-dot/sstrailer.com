import Image from "next/image";

type RemoteImageProps = {
  src: string;
  alt: string;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
};

function isRemoteSrc(src: string) {
  return src.startsWith("http://") || src.startsWith("https://");
}

export function RemoteImage({
  src,
  alt,
  fill = false,
  priority = false,
  className,
  sizes,
  quality = 80,
}: RemoteImageProps) {
  if (isRemoteSrc(src)) {
    return (
      <Image
        src={src}
        alt={alt}
        fill={fill}
        priority={priority}
        className={className}
        sizes={sizes}
        quality={quality}
        unoptimized={src.includes("drive.google.com")}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      priority={priority}
      className={className}
      sizes={sizes}
      quality={quality}
    />
  );
}

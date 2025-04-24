import { Link, useLoaderData } from 'react-router';

import { type photoDetailsLoader } from './loader';

interface PhotoDetailsProps {
  className?: string;
}

export const PhotoDetails = ({ className }: PhotoDetailsProps) => {
  const { photo } = useLoaderData<typeof photoDetailsLoader>();

  return (
    <div className={className}>
      <Link
        to={{
          pathname: `/`,
          hash: photo.id.toString(),
        }}
      >
        123
      </Link>
      <br />
      <a href={photo.url}>
        <img src={photo.src.large} alt={photo.alt} />
      </a>
    </div>
  );
};

import { useLoaderData } from 'react-router';

import { type photoDetailsLoader } from './loader';

interface PhotoDetailsProps {
  className?: string;
}

export const PhotoDetails = ({ className }: PhotoDetailsProps) => {
  const { photo } = useLoaderData<typeof photoDetailsLoader>();

  return (
    <div className={className}>
      <a href={photo.url}>
        <img src={photo.src.large} alt={photo.alt} />
      </a>
    </div>
  );
};

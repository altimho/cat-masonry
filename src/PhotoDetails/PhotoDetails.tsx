import { useLoaderData } from 'react-router';

import { type photoDetailsLoader } from './loader';

export const PhotoDetails = () => {
  const { photo } = useLoaderData<typeof photoDetailsLoader>();

  return (
    <div>
      <a href={photo.url}>
        <img src={photo.src.large} alt={photo.alt} />
      </a>
    </div>
  );
};

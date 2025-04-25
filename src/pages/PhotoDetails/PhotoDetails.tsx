import { Link, useLoaderData } from 'react-router';
import { css } from '@emotion/react';

import { type photoDetailsLoader } from './loader';

const WIDTH = 400;

const wrapperCss = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const containerCss = css({
  margin: '4rem',
  width: `${WIDTH.toString()}px`,

  '@media (max-width: 600px)': {
    margin: 0,
    width: '100%',
  },
});

const backLinkCss = css({
  marginTop: '1rem',
});

const imageCss = css({
  display: 'flex',
  img: {
    width: '100%',
  },
});

const detailsCss = css({
  backgroundColor: '#FFFFFF',
  padding: '1rem',
  a: {
    color: '#60B5FF',
    textDecoration: 'none',
  },
});

export const PhotoDetails = () => {
  const { photo } = useLoaderData<typeof photoDetailsLoader>();

  const src = new URL(photo.src.original);
  src.searchParams.set('auto', 'compress');
  src.searchParams.set('cs', 'tinysrgb');
  src.searchParams.set('w', WIDTH.toString());

  return (
    <div css={wrapperCss}>
      <article
        css={containerCss}
        style={{
          boxShadow: '0 0 2rem 0' + photo.avg_color,
        }}
      >
        <a
          css={imageCss}
          href={photo.url}
          style={{ backgroundColor: photo.avg_color }}
        >
          <img src={src.toString()} alt={photo.alt} />
        </a>
        <section css={detailsCss}>
          <header>
            <h2>
              <a href={photo.photographer_url}>{photo.photographer}</a>
            </h2>
            <p>{photo.alt}</p>
            <a href={photo.url}>{photo.url}</a>
          </header>

          <div css={backLinkCss}>
            <Link
              to={{
                pathname: `/`,
                hash: photo.id.toString(),
              }}
            >
              ← back to list
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
};

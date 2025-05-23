import { Outlet } from 'react-router';
import { css, Global } from '@emotion/react';
import { ErrorBoundary } from 'react-error-boundary';

const globalCss = css({
  body: {
    margin: 0,
    padding: 0,
    backgroundColor: '#FFECDB',
    fontFamily: 'sans-serif',
  },
});

const headCss = css({
  backgroundColor: '#60B5FF',
  padding: '0.5rem 1.5rem',
  margin: 0,
  color: '#FFECDB',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  a: {
    color: '#FFECDB',
  },
  '@media (max-width: 600px)': {
    padding: '0.5rem 0',
    justifyContent: 'space-around',
  },
});

const titleCss = css({
  fontSize: '5rem',
  fontWeight: 'lighter',
  margin: 0,
  padding: 0,
  textShadow: '0 0.25rem 0.5rem rgba(0,0,0,0.25)',
  textWrap: 'nowrap',

  '@media (max-width: 600px)': {
    fontSize: '18vw ',
  },
});

export const App = () => {
  return (
    <>
      <Global styles={globalCss} />
      <div css={headCss}>
        <h1 css={titleCss}>Mas😺nry</h1>
        <div>
          <a href="https://www.pexels.com">Photos provided by Pexels</a>
        </div>
      </div>
      <div>
        <ErrorBoundary
          fallback={<div>Unknown problem. Try to refresh page!</div>}
        >
          <Outlet />
        </ErrorBoundary>
      </div>
    </>
  );
};

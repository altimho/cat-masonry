import { Outlet } from 'react-router';
import { css, Global } from '@emotion/react';

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
});

const titleCss = css({
  fontSize: '5rem',
  fontWeight: 'lighter',
  margin: 0,
  padding: 0,
  textShadow: '0 0.25rem 0.5rem rgba(0,0,0,0.25)',
  textWrap: 'nowrap',
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
        <Outlet />
      </div>
    </>
  );
};

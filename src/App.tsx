import { Outlet } from 'react-router';
import { css, Global } from '@emotion/react';

const globalCss = css({
  body: {
    margin: 0,
    padding: 0,
    backgroundColor: '#FFF1D5',
    fontFamily: 'sans-serif',
  },
});

const headCss = css({
  backgroundColor: '#9FB3DF',
  padding: '0.5rem 1.5rem',
  margin: 0,
  marginBottom: '4px',
  color: '#FFF1D5',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  a: {
    color: '#FFF1D5',
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

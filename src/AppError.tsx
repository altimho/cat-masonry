import { css, Global } from '@emotion/react';

const globalCss = css({
  body: {
    margin: 0,
    padding: 0,
    backgroundColor: '#FFECDB',
    fontFamily: 'sans-serif',
  },
});

const errorCss = css({
  textAlign: 'center',
  fontSize: '2rem',
  padding: '2rem',
});

export const AppError = () => {
  return (
    <>
      <Global styles={globalCss} />
      <div css={errorCss}>Something went wrong with Mas😿nry!</div>
    </>
  );
};

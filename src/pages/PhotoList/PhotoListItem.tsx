import { css } from '@emotion/react';

interface PhotoListItemProps {
  ref?: React.Ref<HTMLDivElement> | null;
  top: number;
  left: number;
  height: number;
  width: number;
}

const photoListItemWrappeerCss = css({
  position: 'absolute',
  overflow: 'hidden',
});

const photoListItemCss = css({
  width: '100%',
  height: '100%',
  background: 'lightgray',
  margin: '4px',
  '@media (max-width: 600px)': {
    margin: '2px 0',
  },
});

export const PhotoListItem = ({
  children,
  ref,
  top,
  left,
  height,
  width,
}: React.PropsWithChildren<PhotoListItemProps>) => {
  return (
    <div
      ref={ref}
      css={photoListItemWrappeerCss}
      style={{
        top,
        left,
        height,
        width,
      }}
    >
      <div css={photoListItemCss}>{children}</div>
    </div>
  );
};

import { Outlet } from 'react-router';

export const App = () => {
  return (
    <>
      <h1>Test Masonry App</h1>
      <div>
        <a href="https://www.pexels.com">Photos provided by Pexels</a>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

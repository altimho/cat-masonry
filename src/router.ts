import { createBrowserRouter } from 'react-router';

import { App } from './App.tsx';
import { PhotoList, photoListLoader } from './pages/PhotoList';
import { PhotoDetails, photoDetailsLoader } from './pages/PhotoDetails';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        Component: PhotoList,
        loader: photoListLoader,
      },
      {
        path: ':photoId',
        Component: PhotoDetails,
        loader: photoDetailsLoader,
      },
    ],
  },
]);

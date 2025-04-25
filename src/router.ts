import { createBrowserRouter } from 'react-router';

import { App } from './App.tsx';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        lazy: async () => {
          const { PhotoList, photoListLoader } = await import(
            './pages/PhotoList'
          );

          return {
            Component: PhotoList,
            loader: photoListLoader,
          };
        },
      },
      {
        path: ':photoId',
        lazy: async () => {
          const { PhotoDetails, photoDetailsLoader } = await import(
            './pages/PhotoDetails'
          );

          return { Component: PhotoDetails, loader: photoDetailsLoader };
        },
      },
    ],
  },
]);

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';

import { router } from './router.ts';

const root = document.getElementById('root');

if (root) {
  createRoot(root).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
} else {
  throw new Error('React app initialization failed, can`t find root element.');
}

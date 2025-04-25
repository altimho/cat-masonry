# Mas😺nry Grid

## Before running

If using nvm, run `nvm use`.

Install npm modules by running `npm i`.

Provide Pexels API key as `PEXELS_API_KEY` ENV-variable or in `.env.local` file. It would be used by proxy server to make request to the Pexels API.

## Running

To build and run app, run `npm start`.

- `npm run dev` — run dev-serveer
- `npm run build` — to build frontend
- `npm run preview` – to serve built frontend

## Design notes

- Used React Router in data mode to balance complexity and functionality.
- Used a collection to store photos, which allows the use of React.memo for the list photo component.
- Lazy loading for routes allows speeding up app load.
- The Pexels API token is not sent to the client for security reasons.
- Pre-calculated masonry layout allows setting the correct page height, which is better for UX.
- The Intersection Observer works better than the onscroll event on touch devices.
- Used the hash part of the URL to scroll to the exact image (useful when navigating back to the list).

### Perfomance analysys

- Checked the Lighthouse score.
- Made a performance recording with a slow network and CPU throttling; checked the flame graphs.
- Checked how the page behaves on a very slow network.

### TODO

- Consider low-resolution image preloading.
- Optimize the calculation of visible masonry items. 
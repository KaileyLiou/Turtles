import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */

const dev = process.env.NODE_ENV === 'development';

const config = {
  kit: {
    adapter: adapter({
      fallback: 'index.html'
    }),
    paths: {
      base: dev ? '' : '/Turtles'
    }
  }
};

export default config;
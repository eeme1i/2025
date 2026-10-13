# Personal website

A static portfolio and Markdown blog built with React Router.

## Development

```sh
npm install
npm run dev
```

## Production

```sh
npm run build
npm run start
```

`start` previews the static build locally. Deploy `build/client` to a static host.
There is no production Node server or Netlify rendering function.
For direct visits in Vite's local preview, use directory URLs such as `/blog/`
and `/blog/hello-blog/`. Netlify handles the directory URLs without the trailing
slash as well. Vite's preview fallback is not the production 404 behavior.

The homepage, blog index, and every `content/blog/*.md` post are rendered at build
time, including their loader data. Adding or editing a post requires a rebuild
and deployment. Browser animations and interactive components still run after
hydration.

## Netlify

`netlify.toml` sets the build command and publish directory. Do not add a
catch-all rewrite to a server function or SPA fallback: existing pages are
static files, and unknown URLs should return the static `public/404.html` page.

After deploying, verify direct visits to `/blog` and each post and check that
the deploy no longer contains the **React Router server handler** function.
Static requests still count toward bandwidth and any applicable web-request
meter, but do not invoke a rendering function.

## Docker

```sh
docker build -t personal-site .
docker run --rm -p 3000:80 personal-site
```

# WhiteboardRT

WhiteboardRT is a modified fork of [Excalidraw](https://github.com/excalidraw/excalidraw), packaged as a self-hosted collaborative whiteboard.

This repository preserves the upstream git history for provenance. WhiteboardRT is **not affiliated with or endorsed by Excalidraw**.

## Changes from upstream

- Removed Excalidraw branding from the web UI, document metadata, PWA manifest, icons, screenshots, and help menu.
- Removed Excalidraw+ promotions, sign-in/sign-up links, workspace export, and auto-redirect behavior.
- Removed the public library publishing flow. Browsing the community library remains available.
- Removed cloud AI/text-to-diagram entry points from this web app.
- Removed SimpleAnalytics and Sentry.
- Removed Excalidraw-owned default backend, WebSocket, AI, Firebase, font CDN, and Plus configuration.
- Self-hosts fonts instead of loading them from the Excalidraw CDN.
- Uses Virgil as the default hand-drawn font. Excalifont remains bundled and registered for compatibility with existing scenes but is hidden from the font picker.
- Added the existing HTTP storage backend and object-persistence fixes from this fork.

## Compatibility

The `.excalidraw` and `.excalidrawlib` file formats, MIME types, exported JSON type identifiers, and internal storage keys are intentionally retained for compatibility.

## Self-hosted deployment

### Docker build

```bash
docker build --no-cache -t whiteboardrt:latest /path/to/excalidraw
```

### Environment configuration

Create an `env.json` file with your backend URLs:

```json
{
  "VITE_APP_WS_SERVER_URL": "http://your-room-server:80",
  "VITE_APP_STORAGE_BACKEND": "http",
  "VITE_APP_HTTP_STORAGE_BACKEND_URL": "http://your-storage-backend:8080/api/v2",
  "VITE_APP_BACKEND_V2_GET_URL": "http://your-storage-backend:8080/api/v2/scenes",
  "VITE_APP_BACKEND_V2_POST_URL": "http://your-storage-backend:8080/api/v2/scenes"
}
```

`/env.json` is loaded at runtime and overrides build-time `VITE_APP_*` values. The image ships an empty `{}` default, so mount your file as shown below.

### Docker run

```bash
docker run -d -p 8080:80 \
  -v ./env.json:/usr/share/nginx/html/env.json:ro \
  whiteboardrt:latest
```

Required infrastructure:

- **room server** — WebSocket server for live collaboration
- **storage backend** — HTTP API for scene/file storage
- **Redis** — storage backend database

## Development

```bash
yarn install
yarn start
yarn test:typecheck
yarn test:app
yarn build:app:docker
```

## License and attribution

WhiteboardRT includes code from Excalidraw, Copyright (c) 2020 Excalidraw, licensed under the MIT License. See [LICENSE](./LICENSE) and [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md).

The Excalidraw name and logo are trademarks of their respective owner. This fork does not claim any affiliation with or endorsement by Excalidraw.

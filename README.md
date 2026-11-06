<p align="center">
  <img alt="WhiteboardRT Logo" src="assets/imgs/whiteboardrt.png" width="256" height="256">
</p>
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

### Runtime environment configuration

Deployment values are generated into `/env.json` inside the container at startup from environment variables. No `env.json` is shipped in the image or mounted from the host.

| Variable | Alias | Default |
| --- | --- | --- |
| `VITE_APP_STORAGE_BACKEND` | `STORAGE_BACKEND` | empty |
| `VITE_APP_HTTP_STORAGE_BACKEND_URL` | `HTTP_STORAGE_BACKEND_URL` | empty |
| `VITE_APP_BACKEND_V2_GET_URL` | `BACKEND_V2_GET_URL` | empty |
| `VITE_APP_BACKEND_V2_POST_URL` | `BACKEND_V2_POST_URL` | empty |
| `VITE_APP_WS_SERVER_URL` | `SOCKET_SERVER_URL` | empty |
| `VITE_APP_LIBRARY_URL` | `LIBRARY_URL` | `https://libraries.excalidraw.com` |

`VITE_APP_*` names take precedence over their aliases. Changes require restarting the container; no image rebuild is needed.

Only these six values are runtime-configurable. Other `VITE_APP_*` values are build-time settings and are not read from the environment at runtime.

### Docker run

```bash
docker run -d -p 8080:80 \
  -e VITE_APP_STORAGE_BACKEND=http \
  -e VITE_APP_HTTP_STORAGE_BACKEND_URL=http://whiteboardrt-storage-backend:8080/api/v2 \
  -e VITE_APP_BACKEND_V2_GET_URL=http://whiteboardrt-storage-backend:8080/api/v2/scenes \
  -e VITE_APP_BACKEND_V2_POST_URL=http://whiteboardrt-storage-backend:8080/api/v2/scenes \
  -e VITE_APP_WS_SERVER_URL=http://whiteboardrt-server:8080 \
  -e VITE_APP_LIBRARY_URL=https://libraries.excalidraw.com \
  whiteboardrt:latest
```

Required infrastructure:

- [**WhiteboardRT Server**](https://github.com/homeserverhq/whiteboardrt-server) — WebSocket server for live collaboration
- [**WhiteboardRT Storage Backend**](https://github.com/homeserverhq/whiteboardrt-storage-backend) — HTTP API for scene/file storage
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

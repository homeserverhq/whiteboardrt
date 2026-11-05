#!/bin/sh
set -eu

OUTPUT_FILE="${RUNTIME_ENV_OUTPUT:-/usr/share/nginx/html/env.json}"

json_escape() {
  printf '%s' "$1" | sed -e 's/\\/\\\\/g' -e 's/"/\\"/g'
}

pick() {
  canonical_name="$1"
  alias_name="$2"
  eval "canonical_value=\${$canonical_name-}"
  eval "alias_value=\${$alias_name-}"
  if [ -n "$canonical_value" ]; then
    printf '%s' "$canonical_value"
  else
    printf '%s' "$alias_value"
  fi
}

storage_backend="$(pick VITE_APP_STORAGE_BACKEND STORAGE_BACKEND)"
http_storage_backend_url="$(pick VITE_APP_HTTP_STORAGE_BACKEND_URL HTTP_STORAGE_BACKEND_URL)"
backend_v2_get_url="$(pick VITE_APP_BACKEND_V2_GET_URL BACKEND_V2_GET_URL)"
backend_v2_post_url="$(pick VITE_APP_BACKEND_V2_POST_URL BACKEND_V2_POST_URL)"
ws_server_url="$(pick VITE_APP_WS_SERVER_URL SOCKET_SERVER_URL)"
library_url="$(pick VITE_APP_LIBRARY_URL LIBRARY_URL)"

if [ -z "$library_url" ]; then
  library_url="https://libraries.excalidraw.com"
fi

tmp_file="${OUTPUT_FILE}.tmp"

umask 022
cat > "$tmp_file" <<EOF
{
  "VITE_APP_STORAGE_BACKEND": "$(json_escape "$storage_backend")",
  "VITE_APP_HTTP_STORAGE_BACKEND_URL": "$(json_escape "$http_storage_backend_url")",
  "VITE_APP_BACKEND_V2_GET_URL": "$(json_escape "$backend_v2_get_url")",
  "VITE_APP_BACKEND_V2_POST_URL": "$(json_escape "$backend_v2_post_url")",
  "VITE_APP_WS_SERVER_URL": "$(json_escape "$ws_server_url")",
  "VITE_APP_LIBRARY_URL": "$(json_escape "$library_url")"
}
EOF

mv "$tmp_file" "$OUTPUT_FILE"
chmod 0644 "$OUTPUT_FILE"

report() {
  if [ -n "$2" ]; then
    echo "  $1: set"
  else
    echo "  $1: empty"
  fi
}

echo "Generated runtime environment at $OUTPUT_FILE"
report VITE_APP_STORAGE_BACKEND "$storage_backend"
report VITE_APP_HTTP_STORAGE_BACKEND_URL "$http_storage_backend_url"
report VITE_APP_BACKEND_V2_GET_URL "$backend_v2_get_url"
report VITE_APP_BACKEND_V2_POST_URL "$backend_v2_post_url"
report VITE_APP_WS_SERVER_URL "$ws_server_url"
report VITE_APP_LIBRARY_URL "$library_url"

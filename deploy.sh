#!/usr/bin/env bash

set -euo pipefail

load_env_var() {
  local var="$1"
  local default="$2"
  if [[ -f "web/.env.production" ]]; then
    local val
    val="$(grep -E "^${var}=" web/.env.production | tail -n 1 | cut -d'=' -f2- || true)"
    if [[ -n "${val}" ]]; then
      echo "${val}"
      return 0
    fi
  fi
  echo "${default}"
}

# Configuration — override via web/.env.production DEPLOY_* vars
USER="$(load_env_var DEPLOY_USER "iwbfnzmznr")"
HOST="$(load_env_var DEPLOY_HOST "66.29.148.128")"
APP_ROOT="$(load_env_var DEPLOY_APP_ROOT "/home/iwbfnzmznr/venue")"
SSH_PORT="$(load_env_var DEPLOY_SSH_PORT "22")"

echo "==> Deploying Venue to ${USER}@${HOST}:${APP_ROOT}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR/web"

echo "==> Installing dependencies (npm ci)"
npm ci

echo "==> Building production bundle"
NODE_ENV=production npm run build

echo "==> Creating production-build.tar.gz"
COPYFILE_DISABLE=1 tar czf production-build.tar.gz \
  .next \
  app.js \
  package.json \
  package-lock.json \
  public \
  .env.production \
  next.config.ts 2>/dev/null || true

echo "==> Uploading to server"
scp -P "${SSH_PORT}" production-build.tar.gz "${USER}@${HOST}:${APP_ROOT}/"

echo "==> Running remote deploy"
ssh -p "${SSH_PORT}" "${USER}@${HOST}" bash -lc "
  set -euo pipefail
  cd '${APP_ROOT}'
  echo ' -> Unpacking production-build.tar.gz'
  tar xzf production-build.tar.gz
  echo ' -> Removing real node_modules (CloudLinux uses venv symlink)'
  rm -rf node_modules
  echo ' -> Done. In hosting panel: Install dependencies then Restart app.'
"

echo "==> Deployment complete. Visit https://venue.plex.ee"

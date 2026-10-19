#!/bin/sh
# Builds the site and deploys dist/ to the Cloudflare Pages project "adityasingh"
# (https://adityasingh.pages.dev). Uses CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID
# if set; otherwise borrows the `cf auth login` session, refreshing it first, since its
# token lasts about an hour.
#
# It is a plain static site: never let wrangler "autoconfigure" this repo into a Worker
# with a server adapter. Deploy with `pages deploy` only.
set -eu
cd "$(dirname "$0")/.."
if [ -z "${CLOUDFLARE_API_TOKEN:-}" ] && command -v cf >/dev/null 2>&1; then
  cf auth whoami >/dev/null 2>&1 || true
  CLOUDFLARE_API_TOKEN=$(python3 -c "import json,os;print(json.load(open(os.path.expanduser('~/Library/Preferences/cloudflare/config/default.json')))['oauth_token'])")
  export CLOUDFLARE_API_TOKEN
fi
npm run build
npx --yes wrangler@4 pages deploy dist --project-name adityasingh --branch main --commit-dirty=true

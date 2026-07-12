#!/usr/bin/env bash
set -euo pipefail

payload="/tmp/doran-op-v4.tar.xz"
cat .doran-bootstrap/part* | base64 --decode > "$payload"
echo "01a29ccb92d74f85bc37b3f05bd1e4c0db9d0341968f4a2e20daba27f588b69b  $payload" | sha256sum --check --strict
xz --test "$payload"
tar -xJf "$payload" -C .

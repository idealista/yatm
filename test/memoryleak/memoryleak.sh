#!/bin/sh

if ! type valgrind >/dev/null; then
  echo "Valgrind required!"
  exit 1
fi

curl -o ./test/memoryleak/libvips.supp https://raw.githubusercontent.com/jcupitt/libvips/master/libvips.supp

G_SLICE=always-malloc G_DEBUG=gc-friendly valgrind \
  --suppressions=test/memoryleak/libvips.supp \
  --suppressions=test/memoryleak/thumbnailer.supp \
  --gen-suppressions=yes \
  --leak-check=full \
  --show-leak-kinds=definite,indirect,possible \
  --num-callers=10 \
  --trace-children=yes \
  npm run test-memleak

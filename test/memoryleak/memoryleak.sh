#!/bin/sh

if ! type valgrind >/dev/null; then
  echo "Valgrind required!"
  exit 1
fi

wget --output-document=`dirname "$0"`/libvips.supp https://raw.githubusercontent.com/jcupitt/libvips/master/libvips.supp

cd `dirname "$0"`/../..

G_SLICE=always-malloc G_DEBUG=gc-friendly valgrind \
  --suppressions=test/memoryleak/libvips.supp \
  --suppressions=test/memoryleak/yatm.supp \
  --gen-suppressions=yes \
  --show-leak-kinds=definite,indirect \
  --num-callers=10 \
  --trace-children=yes \
  --log-file=reports/memoryleak.txt \
  npm run test-memleak

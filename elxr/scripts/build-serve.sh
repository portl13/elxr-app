#!/bin/bash

COMMIT_HASH=$(git rev-parse HEAD);

# Create releases directory if it doesn't already exist
if [ ! -d "releases" ]; then
  mkdir releases;
fi

# Release directory
export BUILD_DIR=releases/$COMMIT_HASH

npm install;

# Build new release
npm run build

# start serving with pm2
npm run serve

npm run pm2 save

# Delete older releases and keep current
for dir in ./releases/*; do
    echo $dir
    [ "$dir" = "./$BUILD_DIR" ] && continue
    rm -rf "$dir"
done

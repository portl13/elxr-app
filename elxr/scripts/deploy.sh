#!/bin/bash

echo "Starting to deploy into Digital ocean QA environment...";

BRANCH=$1

if [ "$BRANCH" = "" ]; then
  BRANCH=master
fi

ssh -Tv root@$SSH_HOST "
  export USER=root;
  export HOME=/root;
  source .nvm/nvm.sh;

  cd elxr;
  nvm use;

  git checkout $BRANCH;
  git pull;

  ./elxr/scripts/build-serve.sh;

  exit;
"
echo "Deploy complete!";

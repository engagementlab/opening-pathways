#!/bin/bash
set -e

export NVM_DIR=~/.nvm
source ~/.nvm/nvm.sh

cd server
npm install

cd ..

cd client
npm install
nvm use
npm run start-testing

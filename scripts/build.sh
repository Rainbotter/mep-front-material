#!/usr/bin/env bash

set -e

npm install -g @angular/cli
npm install
ng build --prod

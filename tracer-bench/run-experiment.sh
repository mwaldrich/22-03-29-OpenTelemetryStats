#!/usr/bin/env bash

# Clean up working dir
rm -r node_modules
npm install

# Run experiment
env BATCH=0 FILE=0 node app.js 2> js_sync_stdout.csv
env BATCH=1 FILE=0 node app.js 2> js_batch_stdout.csv
env BATCH=0 FILE=1 node app.js 2> js_sync_file.csv
env BATCH=1 FILE=1 node app.js 2> js_batch_file.csv
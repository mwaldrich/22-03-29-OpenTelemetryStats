#!/usr/bin/env bash

# Clean up working dir
rm -r node_modules
npm install

# Run experiment
env     DATATYPE=STRING1 node app.js 2> js_string1.csv
env  DATATYPE=STRING1000 node app.js 2> js_string1000.csv
env DATATYPE=STRING10000 node app.js 2> js_string10000.csv
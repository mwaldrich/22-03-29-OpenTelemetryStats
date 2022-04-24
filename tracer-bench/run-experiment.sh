#!/usr/bin/env bash

# Clean up working dir
rm -r node_modules
npm install

# Run experiment
node app.js 2> js_nested.csv
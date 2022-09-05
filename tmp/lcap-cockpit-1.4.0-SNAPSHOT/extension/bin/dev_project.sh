#!/bin/bash

cd "$(dirname "$0")/../"
node node_modules/project/dist/src/project-api/ProjectCLI.js "$@"
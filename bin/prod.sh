#!/bin/sh
npx typeorm migration:run -d dist/db.config.js
node dist/main

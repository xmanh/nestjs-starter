#!/bin/sh
_rand() {
  cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1
}
sed -i "s|JWT_SECRET=.*|JWT_SECRET=$(_rand)|" .env
sed -i "s|COOKIE_SECRET=.*|COOKIE_SECRET=$(_rand)|" .env

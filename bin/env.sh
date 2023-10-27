#!/bin/sh
_rand() {
  cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1
}
sed -i "s|___JWT_SECRET___|$(_rand)|" .env
sed -i "s|___COOKIE_SECRET___|$(_rand)|" .env

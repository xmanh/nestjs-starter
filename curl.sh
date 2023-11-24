#!/bin/sh

curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "Aron.Spinka@hotmail.com", "password": "WhUCyzE5"}'

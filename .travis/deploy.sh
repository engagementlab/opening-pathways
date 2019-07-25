#!/bin/bash

# Ensure in root and run deploy after logging in
ssh -i deploy_key node@"$1" "cd /srv/opening-pathways/source && git pull origin master && bash deploy.sh qa" -vvvv
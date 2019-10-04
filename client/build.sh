#!/bin/bash

# Require arg
if [  $# -eq 0 ]; then
    echo "Must run script w/ one arg, either 'qa' or 'production'"
    exit 1
fi

echo "Running build"

# Source/load nvm
[[ -s $HOME/.nvm/nvm.sh ]] && . $HOME/.nvm/nvm.sh;

nvm use;

if [ "$1" == "qa" ]; then

    ng build --configuration=qa-patient --prod --index=src/index.qa.html
    ng build --configuration=qa-partner --prod --index=src/index.qa.html

    mv dist/patient/index.qa.html dist/patient/index.html
    mv dist/partner/index.qa.html dist/partner/index.html

fi
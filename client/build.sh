#!/bin/bash

# Require arg
if [  $# -eq 0 ]; then
    echo "Must run script w/ one arg, either 'qa' or 'production'"
    exit 1
fi

echo "Running angular build"

# Source/load nvm if not using docker
if [  $# -eq 1 ]; then
    [[ -s $HOME/.nvm/nvm.sh ]] && . $HOME/.nvm/nvm.sh;

    nvm use;
fi

if [ "$1" == "qa" ]; then

    # ng build --configuration=qa-patient --prod --index=src/index.qa.html
    ng build --configuration=qa-partner --prod --index=src/index.qa.html

    # mv dist/patient/index.qa.html dist/patient/index.html
    mv dist/partner/index.qa.html dist/partner/index.html

else

    # ng build --configuration=production-patient --prod --index=src/index.prod.html
    ng build --configuration=production-partner --prod --index=src/index.prod.html

    # mv dist/patient/index.prod.html dist/patient/index.html
    mv dist/partner/index.prod.html dist/partner/index.html

fi
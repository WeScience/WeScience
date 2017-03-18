#!/usr/bin/env bash

apt-get update

apt-get install build-essential libssl-dev libffi-dev python3-dev

pip install --upgrade pip3
pip install Flask

cd /vagrant
export FLASK_DEBUG=1
export FLASK_APP=app.py

echo "
****************************
ALL DONE
****************************

Umm yeah it should be running now.

You can access the Hack24 app on http://192.168.10.200:5000/

****************************
"

flask run --host=0.0.0.0
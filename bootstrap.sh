#!/usr/bin/env bash

apt-get update

apt-get install build-essential libssl-dev libffi-dev python3-dev

pip3 install --upgrade pip3
pip3 install Flask

cd /vagrant

echo "
****************************
ALL DONE
****************************

Umm yeah it should be up now.

vagrant ssh
cd /vagrant
export FLASK_DEBUG=1; export FLASK_APP=app.py
You can access the Hack24 app on http://192.168.10.200:5000/

****************************
"
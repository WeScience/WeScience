#!/usr/bin/env bash

apt-get update

apt-get install -yqq build-essential libssl-dev libffi-dev python3-dev
apt-get install -yqq python3-pip

pip3 install --upgrade pip3
pip3 install Flask

pip3 install flask_sqlalchemy

cd /vagrant
export FLASK_DEBUG=1; export FLASK_APP=app.py

echo "
****************************
ALL DONE
****************************

Umm yeah it should be up now.

vagrant ssh
cd /vagrant
export FLASK_DEBUG=1; export FLASK_APP=app.py
flask run --host=0.0.0.0
You can access the Hack24 app on http://192.168.10.200:5000/

****************************
"
#!/usr/bin/python
import sys
import logging
logging.basicConfig(stream=sys.stderr)
sys.path.insert(0,"/var/www/hack24/")

from FlaskApp import app as application
application.secret_key = '867HGythfy56t7huffdh'
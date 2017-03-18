from flask import Flask, render_template
from database import db, UserDB
app = Flask(__name__)

# View Routes
@app.route("/")
def index():
	name = "hack24";
	return render_template('index.html', name=name)

@app.route("/project/<int:projectid>")
def project(projectid):
	return "project"

@app.route("/project/<int:projectid>/<int:eventid>")
def projectEvent(eventid):
	return "project -> event"

# API Routes

if __name__ == "__main__":
	app.run()
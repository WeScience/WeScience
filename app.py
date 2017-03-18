from flask import Flask, render_template
import database
app = Flask(__name__)

# View Routes
@app.route("/")
def index():
	return render_template('index.html')

@app.route("/project/<int:projectid>")
def project(projectid):
	return "project"

@app.route("/project/<int:projectid>/<int:eventid>")
def projectEvent(eventid):
	return "project -> event"

# API Routes
@app.route("/api/project/<int:projectid>")
def project(projectid):
	return "api project"

@app.route("/api/project/<int:projectid>/<int:eventid>")
def projectEvent(eventid):
	return "api project -> event"

if __name__ == "__main__":
	app.run()
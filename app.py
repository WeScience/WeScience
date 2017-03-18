from flask import Flask, render_template
app = Flask(__name__)

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

if __name__ == "__main__":
	app.run()
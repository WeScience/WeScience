from flask import Flask, render_template, jsonify
import database
app = Flask(__name__)

# View Routes
@app.route("/")
def index():
	return render_template('index.html')

@app.route("/project/<int:projectid>")
def project(projectid):
	#project = database.projects.query.filter_by(id=project).first()
	return render_template('project.html')

@app.route("/project/<int:projectid>/<int:eventid>")
def projectEvent(projectid, eventid):
	return render_template('event.html')

# API Routes
@app.route("/api/project/<int:projectid>")
def apiProject(projectid):
	project = database.projects.query.filter_by(id=project).first()
	return jsonify(project)

@app.route("/api/project/<int:projectid>/<int:eventid>")
def apiProjectEvent(eventid):
	event = database.events.query.filter_by(id=eventid).first()
	return jsonify(event)

if __name__ == "__main__":
	app.run()
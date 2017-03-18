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
@app.route("/api/user/<int:userid>")
def apiUser(userid):
	user = database.users.query.filter_by(id=userid).first()
	return jsonify(user)

@app.route("/api/project/<int:projectid>")
def apiProject(projectid):
	project = database.projects.query.filter_by(id=project).first()
	return jsonify(project)

@app.route("/api/project/events/<int:projectid>")
def apiProjectEvent(eventid):
	events = database.events.query.filter_by(id=eventid)
	return jsonify(event)

@app.route("/api/comments/<int:documentid>")
def apiEventComments(eventid):
	comments = database.comments.filter_by(document_id=documentid)
	return jsonify(comments)

if __name__ == "__main__":
	app.run()
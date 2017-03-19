from flask import Flask, render_template, jsonify
import database
import json
app = Flask(__name__)

# View Routes
@app.route("/")
def index():
	return render_template('index.html')

@app.route("/project/<int:projectid>")
def project(projectid):
	return render_template('project.html')

@app.route("/project/commits/<int:projectid>")
def projectCommits(projectid):
    return render_template('project-commits.html')

@app.route("/project/<int:projectid>/<int:eventid>")
def projectEvent(projectid, eventid):
	return render_template('event.html')

@app.route("/profile/<int:userid>", defaults={'userid': None})
def profile(userid):
    return render_template('profile.html')

@app.route("/dashboard")
def dashboard():
    return render_template('dashboard.html')

@app.route("/new")
def new():
    return render_template('new.html')

# API Routes
@app.route("/api/user/<int:userid>")
def apiUser(userid):
	user = database.users.query.filter_by(id=userid).first()
	userJson = {
		"id" : user.id,
		"name" : user.name,
		"email" : user.email,
		"name" : user.name,
		"institution" : user.institution,
		"position" : user.position,
		"avatar" : user.avatar,
		"twitter" : user.twitter
	}
	return jsonify(userJson)

@app.route("/api/project/<int:projectid>")
def apiProject(projectid):
	project = database.projects.query.filter_by(id=projectid).first()
	projectJson = {
		"id" : project.id,
		"project_name" : project.project_name,
		"start_date" : project.start_date,
		"end_date" : project.end_date,
		"description" : project.description,
		"is_public" : project.isPublic
	}
	return jsonify(projectJson)

@app.route("/api/project/events/<int:projectid>")
def apiProjectEvent(projectid):
	events = database.events.query.filter_by(project_id=projectid)
	eventsJson = {}
	for i in events:
		json = {
			"id" : i.id,
			"document_id" : i.document_id,
			"project_id" : i.project_id,
			"filename" : i.filename,
			"created" : i.created
		}
		eventsJson[i.id] = json
	return jsonify(eventsJson)

@app.route("/api/comments/<int:documentid>")
def apiEventComments(eventid):
	comments = database.comments.filter_by(document_id=documentid)
	return jsonify(comments)

@app.route("/api/documents/getdocumentsbyuser/<int:userid>")
def apiGetDocumentsByUser(userid):
	#documents = database.documents
	return None

if __name__ == "__main__":
	app.run()

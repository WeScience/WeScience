from flask import Flask, render_template, jsonify, request
from sqlalchemy import text
from flask_sqlalchemy import SQLAlchemy
import database
import json
import time
import pprint

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)

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
	sql_vars = {
		"project_id" : projectid,
		"offset" : request.args['offset'],
		"limit" : request.args['limit']
	}

	sql_text = """SELECT e.id, e.project_id, e.filename, e.created, u.name, u.avatar, d.id AS document_id, d.document_title 
	FROM events AS e 
	LEFT JOIN documents AS d ON e.document_id = d.id 
	LEFT JOIN users AS u ON e.user_id = u.id
	WHERE project_id = :project_id
	LIMIT :offset, :limit
	"""
	sql = text(sql_text)
	results = db.engine.execute(sql, sql_vars)
	eventsJson = {}
	for i in results:
		json = {
			"id" : i.id,
			"document_id" : i.document_id,
			"filename" : i.filename,
			"created" : time.strftime("%d/%m/%Y %-I:%M%p"),
			"document_title" : i.document_title,
			"name" : i.name,
			"avatar" : i.avatar,
			"project_id" : i.project_id
		}
		eventsJson[i.id] = json

	sql = text("select count() AS count from events WHERE project_id = :project_id")
	results = db.engine.execute(sql, { "project_id": projectid })
	
	for i in results:
		total = i.count

	final = {
		"total" : total,
		"data" : eventsJson
	}
	return jsonify(final)

@app.route("/api/projects/getprojectsbyuser/<int:userid>")
def apiProjectByUser(userid):
	projects = database.projects
	#projectsData = database.projects_users.query.join(projects).add_columns(projects_users.id, projects.id, projects.project_name, projects.start_date, projects.end_date, projects.description, projects.isPublic).filter_by(user_id=userid)
	projectJson = {}
	for i in projects:
		json = {
			"id" : i.id,
			"project_name" : i.project_name,
			"start_date" : i.start_date,
			"end_date" : i.end_date,
			"description" : i.description,
			"is_public" : i.isPublic
		}
		projectJson[i.id] = json
	return jsonify(projectJson) 

@app.route("/api/comments")
def apiEventComments():
	sql_text = """
	SELECT c.id, u.id as user_id, u.name, c.created, c.document_id, e.project_id, c.comment FROM comments AS c
	LEFT JOIN users AS u ON c.user_id = u.id
	LEFT JOIN documents AS d ON c.document_id = d.id
	LEFT JOIN events AS e ON e.document_id = d.id
	WHERE 1=1
	"""

	if 'project_id' in request.args:
		sql_text += " AND e.project_id = :project_id"

	if 'user_id' in request.args:
		sql_text += " AND e.user_id = :user_id"

	if 'offset' in request.args:
		sql_text += " LIMIT :offset,:limit"

	sql = text(sql_text)
	results = db.engine.execute(sql, request.args)

	commentsJson = {}
	for i in results:
		json = {
			"name" : i.name,
			"user_id" : i.user_id,
			"document_id" : i.document_id,
			"comment" : i.comment,
			"project_id": i.project_id,
			"created" : time.strftime("%d/%m/%Y %-I:%M%p")
		}
		commentsJson[i.id] = json

	sql = text("select count() AS count from comments")
	results = db.engine.execute(sql, request.args)
	
	for i in results:
		total = i.count

	final = {
		"total" : total,
		"data" : commentsJson
	}
	return jsonify(final)

@app.route("/api/documents/getdocumentsbyuser/<int:userid>")
def apiGetDocumentsByUser(userid):
	#documents = database.documents
	return None

if __name__ == "__main__":
	app.run()

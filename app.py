from flask import Flask, render_template, jsonify, redirect, url_for, request
from sqlalchemy import text
from flask_sqlalchemy import SQLAlchemy
import database
import json
import time
import datetime
import random

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

@app.route("/api/projects")
def apiProjects():
	sql_text = """
	SELECT p.id, p.project_name, p.description, p.start_date
	, (SELECT e.created FROM events AS e WHERE e.project_id = p.id LIMIT 1) AS last_updated
	FROM projects AS p
	LEFT JOIN projects_users AS pu ON p.id = pu.project_id
	"""

	where = " WHERE 1=1"

	if 'user_id' in request.args:
		where += " AND pu.user_id = :user_id"
	
	if 'is_public' in request.args:
		where += " AND p.isPublic = :is_public"

	if 'offset' in request.args:
		sql_text += where + " LIMIT :offset,:limit"

	sql = text(sql_text)
	results = db.engine.execute(sql, request.args)

	projectsJson = {}
	for i in results:
		json = {
			"project_id" : i.id,
			"project_name" : i.project_name,
			"description" : i.description,
			"created" : datetime.datetime.fromtimestamp(int(i.start_date)).strftime('%d/%m/%Y %-I:%M%p'),
			"last_updated": datetime.datetime.fromtimestamp(int(i.start_date) + random.randint(3600, 7200)).strftime('%d/%m/%Y %-I:%M%p'),
		}
		projectsJson[i.id] = json

	sql = text("select count() AS count from projects AS p LEFT JOIN projects_users AS pu ON p.id = pu.project_id" + where)
	results = db.engine.execute(sql, request.args)
	
	for i in results:
		total = i.count

	final = {
		"total" : total,
		"data" : projectsJson
	}
	return jsonify(final)

@app.route("/api/document/<int:documentid>")
def apidocument(documentid):
	sql_text = """SELECT e.id, e.filename, e.created 
	FROM events AS e WHERE document_id = :document_id
	ORDER BY created DESC
	"""
	results = db.engine.execute(sql_text, { "document_id": documentid })

	sql = text("select count() AS count from events WHERE document_id = :document_id")
	count_results = db.engine.execute(sql, { "document_id": documentid })
	
	for i in count_results:
		total = i.count

	eventsJson = {}
	count = 0
	for i in results:
		json = {
			"id" : i.id,
			"filename" : i.filename,
			"created" : datetime.datetime.fromtimestamp(int(i.created)).strftime('%d/%m/%Y %-I:%M%p'),
			"revision" : total
		}
		total = total - 1
		eventsJson[count] = json
		count = count + 1

	document = database.documents.query.filter_by(id=documentid).first()
	documentJson = {
		"id" : document.id,
		"document_title" : document.document_title,
		"events" : eventsJson
	}
	return jsonify(documentJson)

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
			"created" : datetime.datetime.fromtimestamp(int(i.created)).strftime('%d/%m/%Y %-I:%M%p'),
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
			"created" : datetime.datetime.fromtimestamp(int(i.created)).strftime('%d/%m/%Y %-I:%M%p'),
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

@app.route("/api/documents")
def apiDocuments():
	sql_text = """
	SELECT d.id, t.document_type, d.document_title, e.project_id
	, (SELECT created FROM events AS e WHERE e.document_id = d.id ORDER BY created DESC LIMIT 1) AS last_updated
	, (SELECT count(*) FROM events AS e WHERE e.document_id = d.id) AS revision
	FROM documents AS d
	LEFT JOIN document_types AS t ON d.document_type = t.id
	LEFT JOIN events AS e ON d.id = e.document_id
	"""

	where = " WHERE 1=1"
	if 'project_id' in request.args:
		where += " AND e.project_id = :project_id"

	if 'user_id' in request.args:
		where += " AND e.user_id = :user_id"

	sql_text += where + " GROUP BY d.id ORDER BY t.document_type";

	if 'offset' in request.args:
		sql_text += " LIMIT :offset,:limit"

	sql = text(sql_text)
	results = db.engine.execute(sql, request.args)

	documentsJson = {}
	count = 0
	for i in results:
		json = {
			"document_id" : i.id,
			"document_type" : i.document_type,
			"last_updated" : datetime.datetime.fromtimestamp(int(i.last_updated)).strftime('%d/%m/%Y %-I:%M%p'),
			"document_title" : i.document_title,
			"revision" : i.revision,
			"project_id" : i.project_id
		}
		documentsJson[count] = json
		count = count + 1

	sql = text("select count(DISTINCT(d.id)) AS count from documents AS d LEFT JOIN events AS e ON d.id = e.document_id" + where)
	results = db.engine.execute(sql, request.args)
	
	for i in results:
		total = i.count

	final = {
		"total" : total,
		"data" : documentsJson
	}
	return jsonify(final)

@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        if request.form['username'] != 'admin' or request.form['password'] != 'admin':
            error = 'Invalid Credentials. Please try again.'
        else:
            return redirect(url_for('dashboard'))
        return render_template('index.html', error=error)

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    error = None
    if request.method == 'POST':
        if (request.form['newusername'] == None) or (request.form['email'] == None) or (request.form['password_one'] == None) or (request.form['password_two'] == None) or (request.form['password_one'] != request.form['password_two']):
            error = None
        else:
            return redirect(url_for('dashboard'))
        return render_template('index.html')

if __name__ == "__main__":
	app.run()

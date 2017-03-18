from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)


class users(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	email = db.Column(db.String(120), unique=True)
	password = db.Column(db.String(120))
	name = db.Column(db.String(120))
	institution = db.Column(db.String(120))
	avatar = db.Column(db.String(120))

	def __init__(self, email, password, name, institution, avatar):
		self.id = id
		self.email = email
		self.password = password
		self.name = name
		self.institution = institution
		self.avatar = avatar

	def __repr__(self):
		return '<User %r>' % self.email

class roles_users(db.Model):
	user_id = db.Column(db.Integer, primary_key=True)
	role = db.Column(db.String(120))

	def __init__(self, role):
		self.user_id = user_id
		self.role = role

	def __repr__(self):
		return '<UserRole %r>' % self.role

class roles(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	role = db.Column(db.String(120))

	def __init__(self, role):
		self.role = role

	def __repr__(self):
		return '<Role %r>' % self.role

class projects(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	project_name = db.Column(db.String(120))
	start_date = db.Column(db.String(120))

	def __init__(self, project_name, start_date):
		self.project_name = project_name
		self.start_date = start_date

	def __repr__(self):
		return '<Project %r>' % self.project_name

class projects_users(db.Model):
	user_id = db.Column(db.Integer, primary_key=True)
	project_id = db.Column(db.Integer)
	permission_level = db.Column(db.Integer)

	def __init__(self, project_id, permission_level):
		self.project_id = project_id
		self.permission_level = permission_level

	def __repr__(self):
		return '<ProjectUser %r>' % self.project_id

class documents(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	document_type = db.Column(db.String(120))
	document_title = db.Column(db.String(120))
	document_description = db.Column(db.String(120))

	def __init__(self, document_type, document_title, document_description):
		self.document_type = document_type
		self.document_title = document_title
		self.document_description = document_description

	def __repr__(self):
		return '<Document %r>' % self.document_title

class document_types(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	document_type = db.Column(db.String(120))

	def __init__(self, document_type):
		self.document_type = document_type

	def __repr__(self):
		return '<DocumentType %r>' % self.document_type

class events(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	document_id = db.Column(db.Integer)
	project_id = db.Column(db.Integer)
	filename = db.Column(db.String(120))
	created = db.Column(db.String(120))

	def __init__(self, id):
		self.document_id = document_id
		self.project_id = project_id
		self.filename = filename
		self.created = created		

	def __repr__(self):
		return '<Event %r>' % self.id

class comments(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	user_id = db.Column(db.Integer)
	document_id = db.Column(db.Integer)
	comment = db.Column(db.String(240))
	created = db.Column(db.String(120))


	def __init__(self, id):
		self.user_id = user_id
		self.document_id = document_id
		self.comment = comment
		self.created = created

	def __repr__(self):
		return '<Comment %r>' % self.id




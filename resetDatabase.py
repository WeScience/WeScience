from database import *
import random

#delete db
db.drop_all()

#recreate db
db.create_all()

#add user
user = users('us@hack24.co.uk', 'hack24', 'ateamwithnoname', 'boss', 'hack24', 'http://www.mikeresoli.co.uk/static/img/avatar.png', '@hack24')
db.session.add(user)

#add roles
supervisor = roles('supervisor')
researcher = roles('researcher')
public = roles('public')
funder = roles('funder')
db.session.add(supervisor)
db.session.add(researcher)
db.session.add(public)
db.session.add(funder)

#add roles user
roles_users = roles_users('1','1')
db.session.add(roles_users)

#add project
project = projects('project 1', '1489854687')
db.session.add(project)

#add project_user
projectUser = projects_users('1','1','1')
db.session.add(projectUser)

#add events
event0 = events('1', '1', 'filename', '1489854687')
event1 = events('2', '1', 'filename', '1489854687')
event2 = events('3', '1', 'filename', '1489854687')
event3 = events('4', '1', 'filename', '1489854687')
event4 = events('5', '1', 'filename', '1489854687')
event5 = events('6', '1', 'filename', '1489854687')
event6 = events('7', '1', 'filename', '1489854687')
db.session.add(event0)
db.session.add(event1)
db.session.add(event2)
db.session.add(event3)
db.session.add(event4)
db.session.add(event5)
db.session.add(event6)

#add comments
commentsList = [
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus semper finibus metus vitae bibendum. Etiam nec lacus sed tellus convallis.',
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tellus nisi, porttitor ac magna vitae, ultrices egestas enim. Integer dapibus.',
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris hendrerit venenatis lorem. Aliquam sodales laoreet venenatis. Curabitur quis iaculis odio.',
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus volutpat ultricies dapibus. Quisque efficitur sagittis magna ac congue. Sed accumsan.'
]
documentIds = ['1', '2', '3', '4', '5', '6', '7']

count = 0
while count <= 50:
	randDocID = random.choice(documentIds)
	randComment = random.choice(commentsList)
	comment = comments('1', randDocID, randComment, '1489854687')
	db.session.add(comment)
	count += 1

#add document types
doctype0 = document_types('Research request')
doctype1 = document_types('Hypothesis')
doctype2 = document_types('Methodology')
doctype3 = document_types('Research results')
doctype4 = document_types('Interpretation')
doctype5 = document_types('Review')
doctype6 = document_types('Milestone')
db.session.add(doctype0)
db.session.add(doctype1)
db.session.add(doctype2)
db.session.add(doctype3)
db.session.add(doctype4)
db.session.add(doctype5)
db.session.add(doctype6)

#add documents
document0 = documents(random.choice(documentIds), 'Document 1', 'Document 1 Desc')
document1 = documents(random.choice(documentIds), 'Document 2', 'Document 2 Desc')
document2 = documents(random.choice(documentIds), 'Document 3', 'Document 3 Desc')
document3 = documents(random.choice(documentIds), 'Document 4', 'Document 4 Desc')
document4 = documents(random.choice(documentIds), 'Document 5', 'Document 5 Desc')
document5 = documents(random.choice(documentIds), 'Document 6', 'Document 6 Desc')
document6 = documents(random.choice(documentIds), 'Document 7', 'Document 7 Desc')
db.session.add(document0)
db.session.add(document1)
db.session.add(document2)
db.session.add(document3)
db.session.add(document4)
db.session.add(document5)
db.session.add(document6)


#commit to db
db.session.commit()


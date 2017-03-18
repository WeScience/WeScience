from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return render_template('public/index.html', name=name)

if __name__ == "__main__":
    app.run()
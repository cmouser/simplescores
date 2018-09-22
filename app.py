from flask import Flask, render_template
import nflgame
import random

app = Flask(__name__)

@app.route('/')
def index():
    games = nflgame.games(2018, week=1)
    return render_template('index.html', summary=games)

if __name__ == "__main__":
    app.run(host="0.0.0.0")

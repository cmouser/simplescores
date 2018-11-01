from flask import Flask, render_template, Response
from datetime import date
import nflgame
import random
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')
    
@app.route('/games.json')
def games():
    weekNumber = 1 + (date.today() - date(2018, 9, 5)).days / 7
    games = nflgame.games(2018, week=weekNumber)
    s = json.dumps(games, default=lambda o: o.__dict__)
    return Response(s, mimetype='application/json')


if __name__ == "__main__":
    app.run(host="0.0.0.0")

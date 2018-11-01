class TeamName extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      team: this.props.team
      };
  }
  
  render() {
    return (
        <div className="ss-teamname">
            <img sizes="100vw" className="ss-teamimg" src={"https://static.nfl.com/static/content/public/static/wildcat/assets/img/logos/teams/" + this.state.team + ".svg"} data-radium="true"/>
            {this.state.team}
        </div>
    );
  }
}

function DriveStatus(props) {
    if(props.show) {
      return (
        <span className="ss-drive-endzones">
          <span className="ss-drive-distance-start"></span>
          <span className="ss-drive-distance-ball"></span>
          <span className="ss-drive-distance-remaining"></span>
        </span>
      )
    
    } else {
      return "";
    }
}



function GameFactory(props) {
    if (props.game.time.qtr == "Fainal") {
        return (
            <CompletedGame game={props.game}/>
        );
    } else  {
        return (
            <InProgressGame game={props.game}/>
        );
    }
}


function Game(props) {
    return (
      <div className={"col-xs-4 ss-game " + props.progress}>
        <div className={props.highlightAway ? "row ss-team-emph" : "row"}>
          <div className="col-xs-8"><TeamName team={props.game.away}/></div>
          <div className="col-xs-4 ss-score">{props.game.score_away}</div>
        </div>
        <div className={props.highlightHome ? "row ss-team-emph" : "row"} >
          <div className="col-xs-8"><TeamName team={props.game.home}/></div>
          <div className="col-xs-4 ss-score">{props.game.score_home}</div>
        </div>
        <div className="row ss-game-summary">
          <div className="col-xs-12">{props.summary}</div>
        </div>
        <DriveStatus game={props.game} show={props.showDrive}/>
      </div>
    );
}

class InProgressGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: props.game,
      progress: props.game.data.redzone ? "inprogress redzone" : "inprogress",
      summary: "Q" + props.game.time.qtr + " " + props.game.time.clock,
      highlightHome: props.game.home === props.game.data.posteam,
      highlightAway: props.game.away === props.game.data.posteam,
      showDrive: true
    };
  }
  
  render() {
    return (
      <Game {...this.state}/>
    );
  }
}

class CompletedGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      game: this.props.game,
      progress: "final",
      summary: "Final",
      highlightHome: this.props.game.home === this.props.game.winner,
      highlightAway: this.props.game.away === this.props.game.winner
      };
  }
  
  render() {
    return (
      <Game {...this.state}/>
    );
  }
}

class ScoreBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: []
      };
  }
  
  componentDidMount() {
    fetch("/games.json")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            games: result
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
  }
  
  render() {
    return (
      <div className="row">
        {this.state.games.map(game => <GameFactory key={game.home} game={game}/>)}
      </div>
    );
  }
}

ReactDOM.render(
  <ScoreBoard/>,
  document.getElementById('root')
);

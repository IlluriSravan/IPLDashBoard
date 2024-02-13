// Write your code here
import './index.css'
import {Component} from 'react'
import MatchCard from '../MatchCard'

class LatestMatch extends Component {
  render() {
    const {latestMatch, recentMatchesDetails} = this.props
    const {
      umpires,
      result,
      manOfTheMatch,
      id,
      date,
      venue,
      competingTeam,
      competingTeamLogo,
      firstInnings,
      secondInnings,
      matchStatus,
    } = latestMatch

    return (
      <div className="container">
        <div className="latest-match">
          <div className="left">
            <p>{competingTeam}</p>
            <p>{date}</p>
            <p>{venue}</p>
            <p>{result}</p>
          </div>
          <img
            src={competingTeamLogo}
            alt={`latest match ${competingTeam}`}
            className="middle"
          />
          <div className="right">
            <h1>First Innings</h1>
            <p>{firstInnings}</p>
            <h1>Second Innings</h1>
            <p>{secondInnings}</p>
            <h1>Man Of The Match</h1>
            <p>{manOfTheMatch}</p>
            <h1>Umpires</h1>
            <p>{umpires}</p>
          </div>
        </div>
        <ul className="history">
          {recentMatchesDetails.map(each => (
            <MatchCard eachteam={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }
}
export default LatestMatch

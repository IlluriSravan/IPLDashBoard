// Write your code here
import './index.css'

const MatchCard = props => {
  const {eachteam} = props
  const {competingTeamLogo, competingTeam, matchStatus, result} = eachteam
  return (
    <li className="list-item">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="competing-image"
      />
      <p>{competingTeam}</p>
      <p>{result}</p>
      <p>{matchStatus}</p>
    </li>
  )
}
export default MatchCard

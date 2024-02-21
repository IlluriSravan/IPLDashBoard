// Write your code here
import './index.css'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import LatestMatch from '../LatestMatch'

class TeamMatches extends Component {
  state = {teamData: [], isLoading: true, statistics: ''}

  componentDidMount() {
    this.getRecent()
  }

  getRecent = async () => {
    const stats = {Lost: 0, Won: 0, draw: 0}
    console.log(stats)
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const updatedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: {
        umpires: data.latest_match_details.umpires,
        result: data.latest_match_details.result,
        manOfTheMatch: data.latest_match_details.man_of_the_match,
        id: data.latest_match_details.id,
        date: data.latest_match_details.date,
        venue: data.latest_match_details.venue,
        competingTeam: data.latest_match_details.competing_team,
        competingTeamLogo: data.latest_match_details.competing_team_logo,
        firstInnings: data.latest_match_details.first_innings,
        secondInnings: data.latest_match_details.second_innings,
        matchStatus: data.latest_match_details.match_status,
      },
      recentMatches: data.recent_matches.map(each => ({
        umpires: each.umpires,
        result: each.result,
        manOfTheMatch: each.man_of_the_match,
        id: each.id,
        date: each.date,
        venue: each.venue,
        competingTeam: each.competing_team,
        competingTeamLogo: each.competing_team_logo,
        firstInnings: each.first_innings,
        secondInnings: each.second_innings,
        matchStatus: each.match_status,
      })),
    }
    console.log(updatedData)

    stats[updatedData.latestMatchDetails.matchStatus] =
      stats[updatedData.latestMatchDetails.matchStatus] + 1

    updatedData.recentMatches.forEach(each => {
      stats[each.matchStatus] = stats[each.matchStatus] + 1
    })
    console.log('stats', stats)
    const statData = [
      {name: 'Won', value: stats.Won},
      {name: 'Lost', value: stats.Lost},
      {name: 'Draw', value: stats.draw},
    ]
    console.log(statData)

    this.setState({
      teamData: updatedData,
      isLoading: false,
      statistics: statData,
    })
    const isLoading = this.state
    console.log(isLoading)
  }

  render() {
    const {teamData, isLoading, statistics} = this.state
    const colrs = ['#00e600', '#ff3300', '#666666']
    console.log(isLoading)
    const {teamBannerUrl, latestMatchDetails, recentMatches} = teamData
    return isLoading ? (
      <div testid="loader">
        <Loader type="TailSpin" color="orange" height={50} width={50} />
      </div>
    ) : (
      <div className="team-match-container">
        <div className="banner">
          <img src={teamBannerUrl} className="banner-image" alt="team banner" />
        </div>
        <p>Latest Matches</p>
        <LatestMatch
          latestMatch={latestMatchDetails}
          recentMatchesDetails={recentMatches}
          key={latestMatchDetails.id}
        />
        <div className="pie-chart">
          <PieChart width={730} height={250}>
            <Pie
              data={statistics}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              label
            >
              {statistics.map((entry, index) => (
                <Cell key={`cell-${index + 1}`} fill={colrs[index]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </div>
        <Link to="/">
          <button type="button" className="back-button">
            Back
          </button>
        </Link>
      </div>
    )
  }
}
export default TeamMatches

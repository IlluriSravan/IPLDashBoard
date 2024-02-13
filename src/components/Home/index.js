// Write your code here
import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import TeamCard from '../TeamCard'

class Home extends Component {
  state = {teams: [], isLoading: true}

  componentDidMount() {
    this.getTeams()
  }

  getTeams = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const updatedTeamData = data.teams.map(each => ({
      id: each.id,
      name: each.name,
      teamImageUrl: each.team_image_url,
    }))
    this.setState({teams: updatedTeamData, isLoading: false})
  }

  render() {
    const {teams, isLoading} = this.state
    return (
      <div className="home-container">
        <div className="top">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
            className="logo"
          />
          <h1>IPL Dashboard</h1>
        </div>
        {isLoading ? (
          <div testid="loader">
            <Loader type="TailSpin" color="red" height={50} width={50} />
          </div>
        ) : (
          <ul className="teams-container">
            {teams.map(each => (
              <TeamCard teamItem={each} key={each.id} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}
export default Home

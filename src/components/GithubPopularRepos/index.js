import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const differentApiStatus = {
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}
// Write your code here

class GithubPopularRepos extends Component {
  state = {
    activeLanguage: languageFiltersData[0].id,

    RepositaryList: [],
    apiStatus: differentApiStatus.loading,
  }

  componentDidMount = () => {
    this.getRepositaryList()
  }

  getRepositaryList = async () => {
    const {activeLanguage} = this.state

    const url = `https://apis.ccbp.in/popular-repos?language=${activeLanguage}`
    const response = await fetch(url)
    const data = await response.json()
    console.log(response)
    if (response.ok === true) {
      console.log(data)
      const popularRepos = data.popular_repos
      const NewReposLIst = popularRepos.map(e => ({
        name: e.name,
        avatarUrl: e.avatar_url,
        id: e.id,
        issuesCount: e.issues_count,
        starsCount: e.stars_count,
        forksCount: e.forks_count,
      }))
      console.log(NewReposLIst)

      this.setState({
        RepositaryList: NewReposLIst,
        apiStatus: differentApiStatus.success,
      })
    } else {
      this.setState({apiStatus: differentApiStatus.failure})
    }
  }

  updateActiveLanguage = language => {
    console.log(language)
    this.setState({activeLanguage: language}, this.getRepositaryList)
  }

  renderRepoList = () => {
    const {RepositaryList} = this.state

    return (
      <ul className="repo-list">
        {RepositaryList.map(e => (
          <RepositoryItem key={e.id} RepoItemObj={e} />
        ))}
      </ul>
    )
  }

  renderFailure = () => (
    <img
      src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png "
      alt="failure"
    />
  )

  renderResult = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case differentApiStatus.loading:
        return (
          <div data-testid="loader">
            <Loader type="ThreeDots" color="#0284c7" height={80} width={80} />
          </div>
        )

      case differentApiStatus.success:
        return this.renderRepoList()
      case differentApiStatus.failure:
        return this.renderFailure()

      default:
        return null
    }
  }

  render() {
    const {activeLanguage} = this.state
    return (
      <div className="MainCont">
        <h1 className="popular-heading">Popular</h1>
        <ul className="uList">
          {languageFiltersData.map(e => (
            <LanguageFilterItem
              key={e.id}
              isLanguageActive={e.id === activeLanguage}
              updateActiveLanguage={this.updateActiveLanguage}
              ItemObj={e}
            />
          ))}
        </ul>
        <div className="list-container">{this.renderResult()}</div>
      </div>
    )
  }
}

export default GithubPopularRepos

// Write your code here
import './index.css'

const RepositoryItem = props => {
  const {RepoItemObj} = props
  console.log(RepoItemObj)
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = RepoItemObj

  return (
    <li className="RepoItem">
      <img className="repo-item-image" src={avatarUrl} alt={name} />
      <h1 className="repo-item-name">{name}</h1>
      <div className="eachCategory">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="eachIcon"
        />
        <p>{starsCount}</p>
        <p>stars</p>
      </div>
      <div className="eachCategory">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png "
          alt="forks"
          className="eachIcon"
        />
        <p>{forksCount}</p>
        <p>forks</p>
      </div>
      <div className="eachCategory">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="eachIcon"
        />
        <p>{issuesCount}</p>
        <p>issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem

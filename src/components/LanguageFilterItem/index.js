// Write your code here
import './index.css'

const LanguageFilterItem = props => {
  const {ItemObj, updateActiveLanguage, isLanguageActive} = props
  const {language, id} = ItemObj

  const onCliked = () => {
    updateActiveLanguage(id)
  }

  const specialClassName = isLanguageActive ? 'active-btn' : ''

  return (
    <li>
      <button
        onClick={onCliked}
        className={`button ${specialClassName}`}
        type="button"
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem

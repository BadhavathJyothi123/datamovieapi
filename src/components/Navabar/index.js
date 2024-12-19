import {Link, withRouter} from 'react-router-dom'

import SearchMoviesContext from '../../Context/SearchMoviesContext'

import './index.css'

const Navabar = props => {
  const renderSearchbar = () => (
    <SearchMoviesContext.Consumer>
      {value => {
        const {onTriggerSearchingQuery, onChangeSearchInput} = value
        const {searchInput} = value

        const onChangeHandler = event => onChangeSearchInput(event.target.value)

        const onSearchHandler = event => {
          event.preventDefault()
          const {history} = props
          onTriggerSearchingQuery()
          history.push('/search')
        }

        return (
          <div className="d-flex align-items-center">
            <input
              type="text"
              onChange={onChangeHandler}
              className="me-2 search-input"
              value={searchInput}
              placeholder="Search"
            />
            <button
              className="btn btn-ouline-info"
              type="button"
              onClick={onSearchHandler}
            >
              Search
            </button>
          </div>
        )
      }}
    </SearchMoviesContext.Consumer>
  )

  return (
    <nav className="navbar-container d-flex align-items-center p-3">
      <div className="logo-container">
        <h1 className="page-logo">movieDB</h1>
      </div>
      <div className="ms-auto d-flex align-items-center">
        <ul className="order-1 d-flex align-items-center p-0 mb-0 ms-3 nav-items-list">
          <li className="nav-items">
            <Link className="nav-link" to="/">
              Popular
            </Link>
          </li>
          <li className="nav-items">
            <Link className="nav-link" to="/top-rated">
              Top Rated
            </Link>
          </li>
          <li className="nav-items">
            <Link className="nav-link" to="/upcoming">
              Upcoming
            </Link>
          </li>
        </ul>
        {renderSearchbar()}
      </div>
    </nav>
  )
}

export default withRouter(Navabar)

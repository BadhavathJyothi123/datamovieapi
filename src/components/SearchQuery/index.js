import Loader from 'react-loader-spinner'

import MovieCard from '../MovieCard'
import Navabar from '../Navabar'
import Pagination from '../Pagination'

import './index.css'
import SearchMoviesContext from '../../Context/SearchMoviesContext'

const SearchQuery = () => {
  const renderEmptyView = () => (
    <div className="empty-view-container">
      <h1>No results found.</h1>
      <p>Do not get worried, Try to search again.</p>
    </div>
  )

  const renderMovieList = searchResponse => {
    const {results} = searchResponse

    if (!results.length) {
      return renderEmptyView()
    }
    return (
      <ul className="row p-0 ms-0 me-0 mt-3">
        {results.map(movie => (
          <MovieCard key={movie.id} movieDetails={movie} />
        ))}
      </ul>
    )
  }

  const renderLoader = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  const renderSearchResultsView = value => {
    const {searchResponse, apiStatus} = value

    switch (apiStatus) {
      case 'IN_PROGRESS':
        return renderLoader()
      case 'SUCCESS':
        return renderMovieList(searchResponse)
      default:
        return renderEmptyView()
    }
  }

  return (
    <SearchMoviesContext.Consumer>
      {value => {
        const {searchResponse, onTriggerSearchingQuery} = value

        return (
          <>
            <Navabar />
            <div className="route-page-body">
              {renderSearchResultsView(value)}
            </div>
            <Pagination
              totalPages={searchResponse.totalPages}
              apiCallback={onTriggerSearchingQuery}
            />
          </>
        )
      }}
    </SearchMoviesContext.Consumer>
  )
}

export default SearchQuery

import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { filterMovies, logout } from '../../actions';
import logo from '../../svgs/rancid-tomatillos-logo.svg';

const Nav = ({ userInfo, movies, userRatings, logout, filterMovies}) => {
  const ratedMovieCount = userRatings.length > 0 ? userRatings.length : null;
  const movieRatedMessage = ratedMovieCount ? <div className='rated-count'>Movies Rated: {ratedMovieCount}</div> : '';
  const filterBtn = userInfo.id ? renderFilterBtn(movies, userRatings, filterMovies) : '';
  const loginText = userInfo.id ? 'Logout' : 'Login';
  // const userLoggedIn = userInfo.id && renderFilterBtn()
  const welcomeMessage = userInfo.name ? `Welcome, ${userInfo.name}!` : '';
  const loginToPath = !userInfo.id ? "/login" : "/";
  const handleLogout = (id) => {
    userInfo.id && logout(id);
  }

  return (
    <header>
      <div className="margin-wrap">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Rancid Tomatillos Logo" />
          </Link>
        </div>
        {filterBtn}
        {movieRatedMessage}
        <div className="login-wrap">
          <span>{welcomeMessage}</span>
          <Link
            to={loginToPath}
            className="login-button"
            onClick={() => handleLogout(userInfo.id)}
            data-testid="login-page-btn"
            >
            {loginText}
          </Link>
        </div>
      </div>
    </header>
  )
}

Nav.propTypes = {
  userInfo: PropTypes.object,
  history: PropTypes.object,
  logout: PropTypes.func
}

const mapStateToProps = state => ({
  userInfo: state.userInfo,
  movies: state.movies,
  userRatings: state.userRatings,
  // filteredMovies: filterRatedMovies(state.movies, state.userRatings)
})

const mapDispatchToProps = dispatch => ({
  logout: id => dispatch( logout(id) ),
  filterMovies: (movies, userRatings) => dispatch( filterMovies(movies, userRatings) )
})

const renderFilterBtn = (movies, userRatings, filterMovies) => {
  return <button 
            className='filter-btn'
            onClick={()=> filterMovies(movies, userRatings)}>
          Filter by Unrated
        </button>
}

// const filterRatedMovies = (movies, userRatings) => {
//   // We need to do something with Redux here
//   // Check state of each movie and only display movies that have been rated
//   // Use a filter to iterate through all movies to get this ⬆️
//   // const result = movies.filter(movie => {
//   //   return userRatings.find(userRating => {
//   //     return userRating.movie_id === movie.id;
//   //   });
//   // });
//   filterMovies()
//   console.log(result)
// }

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Nav));

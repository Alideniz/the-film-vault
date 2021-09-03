import React, { Component } from 'react';
import FilmsContainer from '../FilmsContainer/FilmsContainer';
import SearchBar from '../SearchBar/SearchBar';
import fetchData from '../../apiCalls';
import './MainContent.css';

class MainContent extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      // filteredMovies: [],
      error: '',
    };
  }

  componentDidMount() {
    fetchData('movies')
      .then((data) =>
        this.setState({ movies: [...this.state.movies, ...data.movies] })
      )
      .catch((err) => this.setState({ error: err }));
  }

  filterMovies = (searchInput) => {
    const matchedMovies = this.state.movies.filter((movie) =>
      movie.title.includes(searchInput)
    );
    this.setState({ movies: matchedMovies });
    // needs to set state of filteredMovies not movies because
    // we will not have the array of original movies to got back to
  };

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        {!this.state.movies.length && (
          <p>This is where we'll put our loading page</p>
        )}
        <SearchBar filterMovies={this.filterMovies} />
        <FilmsContainer movies={this.state.movies} />
      </div>
    );
  }
}

export default MainContent;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import search from '../img/search.jpg';
const Movies = () => {
  const [moviesContainer, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  async function fetchMovies(pageNumber) {
    try {
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=deadc1edb0c5e61d6fae4833560728b9&page=${pageNumber}`
      );
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  }

  async function searchMovies(query, pageNumber) {
    try {
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=deadc1edb0c5e61d6fae4833560728b9&query=${query}&page=${pageNumber}`
      );
      setMovies(data.results);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  }

  useEffect(() => {
    if (isSearching) {
      searchMovies(searchQuery, currentPage);
    } else {
      fetchMovies(currentPage);
    }
  }, [currentPage, isSearching]); // Fetch movies whenever currentPage or isSearching changes

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setIsSearching(true);
    setCurrentPage(1); // Reset to first page on new search
    searchMovies(searchQuery, 1);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
    setCurrentPage(1);
    fetchMovies(1);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
    <div
  className="scrolltop position-fixed end-0 mx-2 p-2 rounded-circle bg-danger text-white d-flex justify-content-center align-items-center"
  onClick={scrollToTop}
  style={{
    width: '30px',
    height: '30px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    cursor: 'pointer',
    bottom: '20px', // Position the button 20px from the bottom of the page
    right: '20px'   // Position the button 20px from the right edge
  }}
>
  <i className="fa-solid fa-arrow-up fs-5"></i> {/* Adjusted icon size */}
</div>



      <div className="container py-1">
        <div className="py-2">
        <div className="d-flex justify-content-center movieser w-100 col-md-8 ">
  <img src={search} alt="search" className="w-100 h-100 rounded-2" style={{objectFit: "cover"}} />
  
  <div className="overlay rounded-2"></div>
  
  <form onSubmit={handleSearchSubmit} className="position-absolute top-50 start-50 w-75 translate-middle d-flex align-items-center">
    <input
      type="text"
      className="form-control me-2"
      placeholder="Search for a movie..."
      value={searchQuery}
      onChange={handleSearchChange}
    />
    <button type="submit" className="btn text-white rounded-5 bg-danger">Search</button>
    {isSearching && (
      <button type="button" className="btn btn-secondary ms-2 rounded-5 bg-danger" onClick={handleClearSearch}>
        Clear
      </button>
    )}
  </form>
</div>
      
      
      
      </div>
  




        <div className="row my-2">
          <div className="col-md-4 p-3 bg-gradient">
          <style>
            {`
              @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&family=Monoton&display=swap');
            `}
          </style>
            {/* <h1 className="test">Movies <br />To<br></br> Watch Now</h1> */}
            <h1 className="test py-2">Trending</h1>
          <h1 className="test py-2"> <spam style={{ color: 'red' }}>Movies</spam></h1>
          <h1 className="test py-2">to Watch Now</h1>
          </div>
       
          {moviesContainer.map((movie) => (
            <div className="col-md-2" key={movie.id}>
              <div className="position-relative">
                <Link to={`/Moviesdetails/${movie.id}`}>
                  <img
                    className="w-100 rounded-2 h-100"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                </Link>
                <h5>{movie.title}</h5>
                <div className="rate position-absolute rounded-circle top-0 end-0 bg-black p-1 m-1">
                  {movie.vote_average.toFixed(1)}
                </div>
              </div>
            </div>
          ))}
     
        </div>

        {/* <div className="row my-2">
          {moviesContainer.map((movie) => (
            <div className="col-md-2" key={movie.id}>
              <div className="position-relative">
                <Link to={`/Moviesdetails/${movie.id}`}>
                  <img
                    className="w-100 rounded-2 h-100"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                </Link>
                <h5>{movie.title}</h5>
                <div className="rate position-absolute rounded-circle top-0 end-0 bg-black p-1 m-1">
                  {movie.vote_average.toFixed(1)}
                </div>
              </div>
            </div>
          ))}
        </div> */}

        <nav aria-label="Page navigation example" className="d-flex justify-content-center my-5">
          <ul className="pagination mx-2">
            <li className="page-item underlinee rounded-5 mx-2">
              <button className="btn mx-2 underlinee text-white" onClick={handlePrevPage}>
                Previous
              </button>
            </li>
            <li className="page-item underlinee rounded-5 mx-2">
              <button className="btn mx-2 underlinee text-white" onClick={handleNextPage}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Movies;

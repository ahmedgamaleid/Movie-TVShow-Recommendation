import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import sstv from '../img/tvsh.jpg'

const TvShow = () => {
  const [tvContainer, setTv] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  async function fetchTv(pageNumber) {
    try {
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/tv/week?api_key=deadc1edb0c5e61d6fae4833560728b9&page=${pageNumber}`
      );
      setTv(data.results);
    } catch (error) {
      console.error("Error fetching trending TV shows:", error);
    }
  }

  async function searchTvShows(query, pageNumber) {
    try {
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/search/tv?api_key=deadc1edb0c5e61d6fae4833560728b9&query=${query}&page=${pageNumber}`
      );
      setTv(data.results);
    } catch (error) {
      console.error("Error searching TV shows:", error);
    }
  }

  useEffect(() => {
    if (isSearching) {
      searchTvShows(searchQuery, currentPage);
    } else {
      fetchTv(currentPage);
    }
  }, [currentPage, isSearching]); // Fetch TV shows whenever currentPage or isSearching changes

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
    searchTvShows(searchQuery, 1);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setIsSearching(false);
    setCurrentPage(1);
    fetchTv(1);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
     <div className="scrolltop position-fixed position-absolute top-50 end-0 mx-2  p-2 rounded-5" onClick={scrollToTop}>
  <i className="fa-solid fa-arrow-up fs-4"></i>
</div>

      <div className="container">
      <div className="py-2">
        <div className="d-flex justify-content-center movieser w-100 col-md-8 ">
  <img src={sstv} alt="tv" className="w-100 h-100 rounded-2" style={{objectFit: "cover"}} />
  
  <div className="overlay rounded-2"></div>
  
  <form onSubmit={handleSearchSubmit} className="position-absolute top-50 start-50 w-75 translate-middle d-flex align-items-center">
    <input
      type="text"
      className="form-control me-2"
      placeholder="Search for a tv show..."
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
          <h1 className="test py-2"> <spam style={{ color: 'red' }}>tv</spam></h1>
          <h1 className="test py-2">to Watch Now</h1>          </div>

          {tvContainer.map((tv) => (
            <div className="col-md-2" key={tv.id}>
              <div className="position-relative">
                <Link to={`/Tvdetails/${tv.id}`}>
                  <img
                    className="w-100 rounded-2 h-100"
                    src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                    alt={tv.name}
                  />
                </Link>
                <h5>{tv.name}</h5>
                <div className="rate position-absolute rounded-circle top-0 end-0 bg-black p-1 m-1">
                  {tv.vote_average.toFixed(1)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <nav aria-label="Page navigation example" className="d-flex justify-content-center my-5">
          <ul className="pagination mx-2">
            <li className="page-item underlinee rounded-5 mx-2">
              <button className="btn mx-2  text-white" onClick={handlePrevPage}>
                Previous
              </button>
            </li>
            <li className="page-item underlinee rounded-5 mx-2">
              <button className="btn mx-2  text-white" onClick={handleNextPage}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default TvShow;

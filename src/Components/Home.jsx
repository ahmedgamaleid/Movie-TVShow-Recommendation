import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const Home = () => {
  let [moviesContainer, setMovies] = useState([]);
  let [tvContainer, setTv] = useState([]);
  let [personContainer, setPerson] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);
  async function getTrending(mediaType, setFunc) {
    try {
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/${mediaType}/popular?api_key=deadc1edb0c5e61d6fae4833560728b9`
      );
      setFunc(data.results);
    } catch (error) {
      console.error(`Error fetching trending ${mediaType}:`, error);
      // Handle error state if needed
    }
  }

  useEffect(() => {
    getTrending("movie", setMovies);
    getTrending("tv", setTv);
    getTrending("person", setPerson);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

      

  return (
    <>
      <div
        className="scrolltop position-fixed position-absolute top-50 end-0 mx-2  p-2 rounded-5"
        onClick={scrollToTop}
      >
        <i className="fa-solid  fs-3 fa-arrow-up"></i>
      </div>

      <div className="container">
        <div className="row my-2">
        <div className="col-md-4 p-3 bg-gradient ">
        <style>
@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&family=Monoton&display=swap')
</style>
            <h1 className="test">
            popular<br></br> movies <br></br>to watch now
            </h1>
          </div>
          {moviesContainer.slice(0, 10).map((movie) => (
            <div className="col-md-2" key={movie.id}>
              <div className="position-relative m-0">
                <Link to={`/Moviesdetails/${movie.id}`}>
                  <img
                    className="w-100 rounded-2 h-100"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                </Link>
                {hoveredItem === movie && (
                  <div className="overlay">
                    <h5 className="overlay-text">{movie.title}</h5>
                  </div>
                )}
                <h5 className="py-2">{movie.title}</h5>
                <div className="rate position-absolute  rounded-circle top-0 end-0 bg-black p-1 m-1">
                  {movie.vote_average.toFixed(1)}
                </div>
              </div>
            </div>
          ))}
        </div>

      
       
      

        <div className="row mt-4 mb-2">
        <div className="col-md-4 p-3 bg-gradient ">
            <h1 className="test">
            popular<br></br> tv <br></br>to watch now
            </h1>
          </div>
          {tvContainer.slice(0, 10).map((tv) => (
            <div className="col-md-2" key={tv.id}>
              <div className="position-relative">
              <Link to={`/Tvdetails/${tv.id}`}>
                <img
                  className="w-100"
                  src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                  alt={tv.name}
                /></Link>
                <h5 className="py-2">{tv.name}</h5>
                <div className="rate position-absolute rounded-circle top-0 end-0 bg-black p-1 m-1">
                  {tv.vote_average.toFixed(1)}
                </div>
              </div>
            </div>
          ))}
        </div>

       
        
     <div/>

     

     
         
      
      </div>
    </>
  );
};

export default Home;

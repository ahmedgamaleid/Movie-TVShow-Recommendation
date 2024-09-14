import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Moviesdetails = ({ favoriteMovies, updateFavoriteMovies }) => {
  let { movieid } = useParams();
  const [detmovContainer, setdetmovContainer] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [videos, setVideos] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [logo, setlogo] = useState([]);

  async function getdetails() {
    try {
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieid}?api_key=deadc1edb0c5e61d6fae4833560728b9`
      );
      setdetmovContainer(data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  }

  async function fetchRecommendations() {
    try {
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieid}/similar?api_key=deadc1edb0c5e61d6fae4833560728b9`
      );
      setRecommendations(data.results);
    } catch (error) {
      console.error("Error fetching movie recommendations:", error);
    }
  }

  async function fetchReviews() {
    try {
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieid}/reviews?api_key=deadc1edb0c5e61d6fae4833560728b9`
      );
      setReviews(data.results);
    } catch (error) {
      console.error("Error fetching movie reviews:", error);
    }
  }

  async function fetchVideos() {
    try {
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieid}/videos?api_key=deadc1edb0c5e61d6fae4833560728b9`
      );
      const trailers = data.results.filter((video) => video.type === "Trailer");
      setVideos(trailers);
    } catch (error) {
      console.error("Error fetching movie videos:", error);
    }
  }
  async function fetchlogo() {
    try {
      let { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieid}/images?api_key=deadc1edb0c5e61d6fae4833560728b9`
      );
      const logo = data.logos.filter((LOGO) => LOGO.iso_639_1 === "en");
      setlogo(logo);
    } catch (error) {
      console.error("Error fetching movie logo:", error);
    }
  }
  useEffect(() => {
    getdetails();
    fetchRecommendations();
    fetchReviews();
    fetchVideos();
    fetchlogo();
    const favoriteStatus = localStorage.getItem(`favorite_${movieid}`);
    setIsFavorite(favoriteStatus === "true");
  }, [movieid]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [recommendations]);

  const getLimitedOverview = (overview) => {
    if (!overview) return "";
    return (
      overview.split(" ").slice(0, 15).join(" ") +
      (overview.split(" ").length > 20 ? "..." : "")
    );
  };

  const getYear = (date) => {
    if (!date) return "";
    return date.split("-", 1);
  };

  const renderStarRating = (rating) => {
    const stars = [];
    const roundedRating = Math.round(rating / 2); // Convert 0-10 scale to 0-5 scale
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          icon={i <= roundedRating ? solidStar : regularStar}
          key={i}
          className="text-warning"
        />
      );
    }
    return stars;
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleFavorite = () => {
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);
    localStorage.setItem(`favorite_${movieid}`, newFavoriteStatus.toString());

    // Update the favoriteMovies state in parent component
    if (updateFavoriteMovies) {
      updateFavoriteMovies(movieid, newFavoriteStatus);
    }
  };

  return (
    <div div className="overview-container">
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

      <div className="container-fluid ">
        {/* Movie details section */}
        <div className="row  ">
  <div className="col-12 over-view ">
    <div className="imagefull position-relative vh-100">
      <img
        className="img-fluid rounded-2 w-100 h-100"
        src={`https://image.tmdb.org/t/p/w500${detmovContainer.backdrop_path}`}
        alt=""
      />
      <div className="contentimg position-absolute w-100">
        <div className="container">
          <div className="row">
            <div className="col-md-3 mb-3">
              <img
                className="rounded-2 img-fluid   my-0 h-100 w-100"
                src={`https://image.tmdb.org/t/p/w500${detmovContainer.poster_path}`}
                alt=""
              />
            </div>
            <div className="col-md-9">
              <h1 className="mb-4 text-danger">
                <img
                  className="rounded-4 pb-1  img-fluid"
                  src={`https://image.tmdb.org/t/p/w500${logo[0]?.file_path}`}
                  alt=""
                  style={{
                    width: '40%',
                    height: '40%',
                    maxWidth: '100%',
                  }}
                />
                {/*             <img
  className="rounded-4 pb-3 my-4 img-fluid"
  src={`https://image.tmdb.org/t/p/w500${logotv[0]?.file_path}`}
  alt=""
  style={{
    width: '40%',
    height: 'auto',
    maxWidth: '100%',
  }}
/> */}
                {/* {detmovContainer.title} */}
              </h1>
              <div className="mb-3 ">
                <h6 className="text-truncate" style={{ overflow: '', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {getLimitedOverview(detmovContainer.overview)}
                </h6>
              </div>
              <div className="d-flex flex-wrap mb-3">
                <p className="me-3">
                  {getYear(detmovContainer.release_date)}
                </p>
                <p>
                  <span
                    className="p-1 rounded-2"
                    style={{ color: "black", backgroundColor: "yellow" }}
                  >
                    IMDB
                  </span>{" "}
                  {detmovContainer.vote_average
                    ? detmovContainer.vote_average.toFixed(1)
                    : ""}
                </p>
              </div>
              <div className=" d-none d-sm-flex d-flex flex-wrap mb-4">
                {detmovContainer.genres &&
                  detmovContainer.genres.map((genre) => (
                    <p
                      className="mx-3 px-4 underlinee rounded-5"
                      key={genre.id}
                    >
                      {genre.name}
                    </p>
                  ))}
              </div>
              <div className="d-none d-sm-flex iconedet my-4 rounded-circle d-flex justify-content-center align-items-center">
                <a
                  className="nonlink"
                  href={detmovContainer.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="p-4 fs-3 fas fa-search"></i>
                  
                </a>
                
              </div>
              <div className="favorite-icon" onClick={toggleFavorite}>
                <FontAwesomeIcon
                  icon={isFavorite ? solidStar : regularStar}
                  size="2x"
                  style={{
                    color: isFavorite ? "gold" : "grey",
                    cursor: "pointer",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


        {/* Recommendations section */}
        <div className="row px-1">
          <div className="col-12">
            <div className="container my-5">
              <style>
                {`
              @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&family=Monoton&display=swap');
            `}
              </style>
              <h2 className="test underline w-25 my-3">Recommendations</h2>
              <div className="row">
                {recommendations.map((recommendation) => (
                  <div
                    className="col-lg-3 col-md-4 col-sm-6 mb-4 recommendation-card"
                    key={recommendation.id}
                    onMouseEnter={() => setHoveredCard(recommendation.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <Link to={`/Moviesdetails/${recommendation.id}`}>
                      <div className="card-wrapper">
                        <img
                          src={`https://image.tmdb.org/t/p/w500${recommendation.poster_path}`}
                          alt={recommendation.title}
                          className="img-fluid rounded-2"
                        />
                        {hoveredCard === recommendation.id && (
                          <div className="card-overlay position-absolute top-0 start-0 w-100 h-100 p-3 d-flex flex-column justify-content-center bg-dark bg-opacity-75 rounded-2">
                            <h3 className="text-danger">
                              {recommendation.title}
                            </h3>
                            <p>
                              {getLimitedOverview(recommendation.overview)}
                            </p>
                          </div>
                        )}
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Videos section */}
        <div className="row">
          <div className="col-12">
            <div className="container my-5">
              <h2 className="test underline w-25 my-3">Trailers</h2>
              <div className="row">
                {videos.map((video) => (
                  <div className="col-lg-6 col-md-6 mb-4" key={video.id}>
                    <div className="video-content">
                      <iframe
                        width="100%"
                        height="315"
                        src={`https://www.youtube.com/embed/${video.key}`}
                        title={video.name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews section */}
        {reviews.length > 0 && (
          <div className="row">
            <div className="col-12">
              <div className="container my-5">
                <h2 className="test underline w-25 my-3">Reviews</h2>
                <div
                  id="reviewsCarousel"
                  className="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner">
                    {reviews.map((review, index) => (
                      <div
                        key={review.id}
                        className={`carousel-item ${index === 0 ? "active" : ""}`}
                      >
                        <div className="review-content p-3">
                          <h5>{review.author}</h5>
                          <p>{review.content}</p>
                          <p>Rating: {review.author_details.rating || "N/A"}</p>
                          <div className="star-rating">
                            {renderStarRating(review.author_details.rating)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#reviewsCarousel"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#reviewsCarousel"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Moviesdetails;

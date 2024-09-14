import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const Tvdetails = () => {
  let { tvid } = useParams();
  const [dettvContainer, setdettvContainer] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [logotv, setlogotv] = useState([]);

  useEffect(() => {
    const getDetailstv = async () => {
      try {
        let { data } = await axios.get(
          `https://api.themoviedb.org/3/tv/${tvid}?api_key=deadc1edb0c5e61d6fae4833560728b9`
        );
        setdettvContainer(data);
      } catch (error) {
        console.error("Error fetching TV show details:", error);
        // Handle error state if needed
      }
    };
    async function fetchlogotv() {
      try {
        let { data } = await axios.get(
          `https://api.themoviedb.org/3/tv/${tvid}/images?api_key=deadc1edb0c5e61d6fae4833560728b9`
        );
        const logotv = data.logos.filter((LOGO) => LOGO.iso_639_1 === "en");
        setlogotv(logotv);
      } catch (error) {
        console.error("Error fetching tv logo:", error);
      }
    }
    const fetchRecommendations = async () => {
      try {
        let { data } = await axios.get(
          `https://api.themoviedb.org/3/tv/${tvid}/recommendations?api_key=deadc1edb0c5e61d6fae4833560728b9`
        );
        console.log("Recommendations data:", data); // Debugging line
        setRecommendations(data.results);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        // Handle error state if needed
      }
    };
    fetchlogotv();
    getDetailstv();
    fetchRecommendations();
  }, [tvid]);

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top when recommendations change
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
    return date.split("-")[0];
  };
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleCardHover = (id) => {
    setHoveredCard(id);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
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



      <div className="imagefull position-relative">
        <img
          className="img-fluid rounded-2 h-100 w-100"
          src={`https://image.tmdb.org/t/p/w500${dettvContainer.backdrop_path}`}
          alt=""
        />
        <div className="contentimg position-absolute">
          <div className="container">
            <div className="row">
              <div className="col-md-3 poster">
                <img
                  className="rounded-2  my-0 h-100 w-100"
                  src={`https://image.tmdb.org/t/p/w500${dettvContainer.poster_path}`}
                  alt=""
                />
              </div>
              <div className="col-md-9 ">
            <img
  className="rounded-4 pb-1  img-fluid"
  src={`https://image.tmdb.org/t/p/w500${logotv[0]?.file_path}`}
  alt=""
  style={{
    width: '40%',
    height: '40%',
    maxWidth: '100%',
  }}
/>

                {/* <h1 className=" text-danger mb-4">{dettvContainer.name}</h1> */}
                <div className="d-none d-sm-flex flex-row mb-3">
  <h6>{getLimitedOverview(dettvContainer.overview)}</h6>
</div>

                <div className="d-flex flex-row mb-3">
                  <p className="mx-3">
                    {getYear(dettvContainer.first_air_date)}
                  </p>
                  <p><span className="p-1 rounded-2" style={{ color: "black", backgroundColor: "yellow" }}>IMDB</span> {dettvContainer.vote_average}</p>
                </div>
                <div className="d-none d-sm-flex flex-row mb-4">
  {dettvContainer.genres &&
    dettvContainer.genres.map((genre) => (
      <p className="mx-3 px-4 underlinee rounded-5" key={genre.id}>
        {genre.name}
      </p>
    ))}
</div>

                <div className=" iconedet my-4 rounded-circle d-flex justify-content-center align-items-center">
                  <a
                    className="nonlink"
                    href={dettvContainer.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="p-4 fs-3 fas fa-search"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations section */}
      <div className="container my-5 px-2">
      <style>
                {`
              @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&family=Monoton&display=swap');
            `}
              </style>
        <h2 className=" test underline w-25 my-3">Recommendations</h2>
        <div className="row">
          {recommendations.length === 0 ? (
            <p>No recommendations available.</p>
          ) : (
            recommendations.map((recommendation) => (
              <div
                className="col-md-3 mb-4 recommendation-card"
                key={recommendation.id}
                onMouseEnter={() => handleCardHover(recommendation.id)}
                onMouseLeave={handleCardLeave}
              >
                <Link to={`/Tvdetails/${recommendation.id}`}>
                  <div className="card-wrapper ">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${recommendation.poster_path}`}
                      alt={recommendation.name}
                      className="img-fluid rounded-2"
                    />
                    {hoveredCard === recommendation.id && (
                      <div className="card-overlay position-absolute top-0 start-0 w-100 h-100 p-3 d-flex flex-column justify-content-center bg-dark bg-opacity-75 rounded-2">
                        <h3 className="text-danger ">{recommendation.name}</h3>
                        <p className="text-white">{getLimitedOverview(recommendation.overview)}</p>
                      </div>
                    )}
                  </div>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>

      {/* More information section */}
      <div className="container my-5">
        <h2 className=" test underline w-25 my-3">Seasons</h2>
        <div className="d-flex flex-row align-items-center mb-5">
          {/* Render posters for each season */}
          {dettvContainer.seasons &&
            dettvContainer.seasons.map((season) => (
              <div className="mx-3" key={season.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${season.poster_path}`}
                  alt={`Poster for ${season.name}`}
                  className="season-poster w-100 rounded-2"
                />
                <p>{season.name}</p>
              </div>
            ))}
        </div>

        {/* Render other details */}
        <div className="d-flex flex-row">
          <h5>Production Companies</h5>
          {dettvContainer.production_companies &&
            dettvContainer.production_companies.map((company) => (
              <p className="mx-3 underline" key={company.id}>
                {company.name}
              </p>
            ))}
        </div>
        <div className="d-flex flex-row">
          <h5>Spoken Languages</h5>
          {dettvContainer.spoken_languages &&
            dettvContainer.spoken_languages.map((lang) => (
              <p className="mx-3 underline" key={lang.iso_639_1}>
                {lang.english_name}
              </p>
            ))}
        </div>
        <div className="d-flex flex-row">
          <h5>Tagline</h5>
          <p className="mx-3 underline">{dettvContainer.tagline}</p>
        </div>
        <div className="d-flex flex-row">
          <h5>Status</h5>
          <p className="mx-3 underline">{dettvContainer.status}</p>
        </div>
        <div className="d-flex flex-row">
          <h5>Number of Seasons</h5>
          <p className="mx-3 underline">{dettvContainer.number_of_seasons}</p>
        </div>
        <div className="d-flex flex-row">
          <h5>Number of Episodes</h5>
          <p className="mx-3 underline">{dettvContainer.number_of_episodes}</p>
        </div>
        <div className="d-flex flex-row">
          <h5>Network</h5>
          <p className="mx-3 underline">
            {dettvContainer.networks && dettvContainer.networks[0]?.name}
          </p>
        </div>
        <div className="d-flex flex-row ">
          <h5>First Air Date</h5>
          <p className="mx-3 underline">{dettvContainer.first_air_date}</p>
        </div>
        <div className="d-flex flex-row">
          <h5>Last Air Date</h5>
          <p className="mx-3 underline">{dettvContainer.last_air_date}</p>
        </div>
      </div>
    </>
  );
};

export default Tvdetails;

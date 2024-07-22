import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Persondet = () => {
  const { personid } = useParams();
  const [personDetails, setPersonDetails] = useState(null);
  const [combinedCredits, setCombinedCredits] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    async function fetchPersonDetails() {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/person/${personid}?api_key=deadc1edb0c5e61d6fae4833560728b9`);
        setPersonDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching person details', error);
        setLoading(false);
      }
    }

    async function fetchCombinedCredits() {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/person/${personid}/combined_credits?api_key=deadc1edb0c5e61d6fae4833560728b9`);
        setCombinedCredits(response.data.cast); // Assuming you want to display cast credits
      } catch (error) {
        console.error('Error fetching combined credits', error);
      }
    }

    async function fetchRecommendations() {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/person/${personid}/movie_credits?api_key=deadc1edb0c5e61d6fae4833560728b9`);
        setRecommendations(response.data.cast);
      } catch (error) {
        console.error('Error fetching recommendations', error);
      }
    }

    fetchPersonDetails();
    fetchCombinedCredits();
    fetchRecommendations();
  }, [personid]);

  const getLimitedText = (text, maxLength = 100) => {
    if (!text) return "";
    const words = text.split(" ");
    if (words.length <= maxLength) {
      return text;
    } else {
      return words.slice(0, maxLength).join(" ") + "...";
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!personDetails) {
    return <div>Error loading details</div>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <img
            className="w-75 rounded-3"
            src={`https://image.tmdb.org/t/p/w500${personDetails.profile_path}`}
            alt={personDetails.name}
          />
        </div>
        <div className="col-md-8">
          <h1 className='text-danger my-4'>{personDetails.name}</h1>
          <p>{getLimitedText(personDetails.biography)}</p>
          <p><strong>Birthday:</strong> {personDetails.birthday}</p>
          <p><strong>Place of Birth:</strong> {personDetails.place_of_birth}</p>
          <p><strong>Popularity:</strong> {personDetails.popularity}</p>
        </div>
      </div>

      {/* Displaying Recommendations */}
      <div className="row mt-4">
        <div className="col-12">
          <h3 className="underline w-25">Recommendations</h3>
          <div className="row">
            {recommendations.map((recommendation) => (
              <div
                className="col-lg-3 col-md-4 col-sm-6 mb-4 recommendation-card"
                key={recommendation.id}
                onMouseEnter={() => setHoveredCard(recommendation.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <Link to={`/Moviesdetails/${recommendation.id}`}>
                  <div className="card-wrapper ">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${recommendation.poster_path}`}
                      alt={recommendation.title}
                      className="img-fluid rounded-2"
                    />
                    {hoveredCard === recommendation.id && (
                      <div className="card-overlay position-absolute top-0 start-0 w-100 h-100 p-3 d-flex flex-column justify-content-center bg-dark bg-opacity-75 rounded-2">
                        <h3 className="text-danger">{recommendation.title}</h3>
                        <p>{getLimitedText(recommendation.overview, 15)}</p>
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
  );
};

export default Persondet;

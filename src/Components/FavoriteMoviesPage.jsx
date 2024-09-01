import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { useParams, Link } from "react-router-dom";
const FavoriteMoviesPage = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [moviesWatched, setMoviesWatched] = useState(0);
  const [watchedMovies, setWatchedMovies] = useState(new Set()); // Track watched movies
  const [totalRuntime, setTotalRuntime] = useState(0); // Total runtime in minutes

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      try {
        const favoriteIds = Object.keys(localStorage)
          .filter(key => key.startsWith('favorite_') && localStorage.getItem(key) === 'true')
          .map(key => key.replace('favorite_', ''));

        if (favoriteIds.length === 0) {
          setFavoriteMovies([]);
          return;
        }

        const movieDetailsPromises = favoriteIds.map(id =>
          axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=deadc1edb0c5e61d6fae4833560728b9`)
        );
        const movieDetailsResponses = await Promise.all(movieDetailsPromises);
        const movies = movieDetailsResponses.map(response => response.data);

        setFavoriteMovies(movies);

        // Initialize watched movies from local storage
        const savedWatchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
        setWatchedMovies(new Set(savedWatchedMovies)); 

        // Initialize moviesWatched from local storage
        const savedMoviesWatched = parseInt(localStorage.getItem('moviesWatched')) || 0;
        setMoviesWatched(savedMoviesWatched);

        // Calculate total runtime of watched movies
        const watchedMoviesSet = new Set(savedWatchedMovies);
        const runtimeSum = movies.reduce((total, movie) => {
          return watchedMoviesSet.has(movie.id) ? total + (movie.runtime || 0) : total;
        }, 0);

        setTotalRuntime(runtimeSum);

        // Debug logs
        console.log('Initial watched movies from localStorage:', savedWatchedMovies);
        console.log('Initial moviesWatched count from localStorage:', savedMoviesWatched);
        console.log('Initial total runtime in minutes:', runtimeSum);
      } catch (error) {
        console.error('Error fetching favorite movies:', error);
        setFavoriteMovies([]);
      }
    };

    fetchFavoriteMovies();
  }, []);

  const handleIconClick = (movieId) => {
    setWatchedMovies(prevWatchedMovies => {
      const newWatchedMovies = new Set(prevWatchedMovies);
      
      if (newWatchedMovies.has(movieId)) {
        newWatchedMovies.delete(movieId);
      } else {
        newWatchedMovies.add(movieId);
      }

      // Save to localStorage
      localStorage.setItem('watchedMovies', JSON.stringify(Array.from(newWatchedMovies)));
      
      // Update count
      const updatedMoviesWatched = newWatchedMovies.size;
      localStorage.setItem('moviesWatched', updatedMoviesWatched); // Save count of watched movies
      setMoviesWatched(updatedMoviesWatched);

      // Update total runtime
      const runtimeSum = favoriteMovies.reduce((total, movie) => {
        return newWatchedMovies.has(movie.id) ? total + (movie.runtime || 0) : total;
      }, 0);

      setTotalRuntime(runtimeSum);

      // Debug logs
      console.log('Updated watched movies:', Array.from(newWatchedMovies));
      console.log('Updated moviesWatched count:', updatedMoviesWatched);
      console.log('Updated total runtime in minutes:', runtimeSum);

      return newWatchedMovies;
    });
  };

  // Convert minutes to hours, days, and months
  const minutesToMonths = Math.floor(totalRuntime / 43200); // Convert to months
  const remainingMinutesAfterMonths = totalRuntime % 43200;
  const minutesToDays = Math.floor(remainingMinutesAfterMonths / 1440); // Convert remaining minutes to days
  const remainingMinutesAfterDays = remainingMinutesAfterMonths % 1440;
  const minutesToHours = Math.floor(remainingMinutesAfterDays / 60); // Convert remaining minutes to hours

  return (
    <div className='container bbb'>
      <div className='row mb-4 flex-row justify-content-around'>
        <div className='col-lg-4 d-flex flex-column text-center my-2'>
          <div className='border bbbbbb   p-3 rounded-2'>
            <h6><i className="fa-solid fa-clock"></i> Movie Time</h6>
            <hr></hr>
            <div className='row'>
              <div className='col-4'>
                <p><strong>{minutesToHours}</strong> hours</p>
              </div>
              <div className='col-4'>
                <p><strong>{minutesToDays}</strong> days</p>
              </div>
              <div className='col-4'>
                <p><strong>{minutesToMonths}</strong> months</p>
              </div>
            </div>
          </div>
        </div>
        <div className='col-lg-4 text-center'>
          <div className='border p-3 rounded-2'>
            <h6><i className="fa-solid fa-clapperboard py-2"></i> Movies Watched</h6>
            <hr></hr>
            <div className='numofmovie'>
              <span>{moviesWatched}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        {favoriteMovies.length > 0 ? (
          favoriteMovies.map((movie) => (
            <div className='mmmov col-lg-3 col-md-4 col-sm-6 mb-4' key={movie.id}>
              <div className=' position-relative'>
              <Link to={`/Moviesdetails/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className='rounded-2 w-100  h-100' // Ensure image fits the card
                /> </Link>
              
                  <h5 className='movie-title'>{movie.title}</h5>
              
                {/* Clickable Icon */}
                <div
                  className='position-absolute top-0 start-0 m-2'
                  onClick={() => handleIconClick(movie.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    size='2x'
                    style={{ color: watchedMovies.has(movie.id) ? 'green' : 'gray' }} // Conditional color
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='col-12 text-center'>
            <p>No favorite movies found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoriteMoviesPage;

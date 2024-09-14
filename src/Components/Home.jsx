import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Import Swiper core styles
import 'swiper/css/navigation'; // Import specific Swiper components styles
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


import 'swiper/css/scrollbar';const splitTextIntoWords = (text) => {
  return text.split(' ').map((word, index) => ({
    word,
    key: index,
  }));
};

// Animation properties
const wordAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: index * 0.05 },
  }),
};

const Home = () => {
  const [moviesContainer, setMovies] = useState([]);
  const [tvContainer, setTv] = useState([]);
  const [personContainer, setPerson] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const splitTextIntoWords = (text) => {
    return text.split(' ').map((word, index) => ({
      word,
      key: index,
    }));
  };
  const wordAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.05 },
    }),
  };
  
  async function getTrending(mediaType, setFunc) {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${mediaType}/popular?api_key=deadc1edb0c5e61d6fae4833560728b9`
      );
      setFunc(data.results);
    } catch (error) {
      console.error(`Error fetching trending ${mediaType}:`, error);
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

  const introText = `
    Welcome to our Home page, where the magic of <span style="color: red;">cinema and television</span> 
    comes alive! Here, you'll find an exciting selection of popular movies
    and TV shows that are trending right now. Whether you're a film
    aficionado or a casual viewer, we have something for everyone. Our
    carefully curated lists showcase the hottest releases, from
    blockbuster hits to critically acclaimed gems. Explore our vibrant,
    user-friendly interface to discover new favorites, enjoy high-quality
    images, and easily navigate through detailed content. With our dynamic
    recommendations and interactive features, finding your next
    binge-worthy experience has never been easier. Dive in and start your
    entertainment journey with us today!
  `;

  return (
    <>
      <div
        className="scrolltop position-fixed position-absolute top-50 end-0 mx-2 p-2 rounded-5"
        onClick={scrollToTop}
      >
        <i className="fa-solid fs-3 fa-arrow-up"></i>
      </div>

      <div className="container">
        <motion.p
          className="my-5"
          initial="hidden"
          animate="visible"
          variants={wordAnimation}
          custom={0}
          dangerouslySetInnerHTML={{ __html: introText }}
        />




        <div className="row my-2">
          <style>
            {`
              @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&family=Monoton&display=swap');
            `}
          </style>
          <div className="col-md-4 p-3 bg-gradient">
            <h1 className="test">
              popular<br />
              <span style={{ color: "red" }}><br></br>movies<br></br></span>
              <br />
              to watch now
            </h1>
          </div>
          {moviesContainer.slice(0, 10).map((movie) => (
            <div className="col-md-2" key={movie.id}>
              <div
                className="position-relative m-0"
                onMouseEnter={() => setHoveredItem(movie)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link to={`/Moviesdetails/${movie.id}`}>
                  <img
                    className="w-100 rounded-2 h-100"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                </Link>
               
                <h5 className="py-2">{movie.title}</h5>
                <div className="rate position-absolute rounded-circle top-0 end-0 bg-black p-1 m-1">
                  {movie.vote_average.toFixed(1)}
                </div>
              </div>
        {/* <Swiper
  navigation={true}
  modules={[Navigation, Pagination, Scrollbar]}
  className="mySwiper"
  spaceBetween={50}
  slidesPerView={1}
  onSlideChange={() => console.log('slide change')}
  scrollbar={{ draggable: true }}
  pagination={{ clickable: true }}
>
  {moviesContainer.slice(0, 10).map((movie) => (
    <SwiperSlide key={movie.id}>
      <Link to={`/Moviesdetails/${movie.id}`}>
        <img
          className="w-100 h-100 p-1 rounded-2"
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          alt={movie.title}
        />
      </Link>
    </SwiperSlide>
  ))}
</Swiper> */}

            </div>
          ))}
        </div>

        <div className="row mt-4 mb-2">
          <div className="col-md-4 p-3 bg-gradient">
            <h1 className="test">
              popular<br />
              <span style={{ color: "red" }}><br></br>tv<br></br></span>
              <br />
              to watch now
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
                  />
                </Link>
                <h5 className="py-2">{tv.name}</h5>
                <div className="rate position-absolute rounded-circle top-0 end-0 bg-black p-1 m-1">
                  {tv.vote_average.toFixed(1)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;

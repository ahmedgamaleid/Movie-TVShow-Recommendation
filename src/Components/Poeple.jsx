import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const People = () => {
  const [personContainer, setPersonContainer] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/trending/person/week?api_key=deadc1edb0c5e61d6fae4833560728b9&page=${currentPage}`
        );
        setPersonContainer(data.results);
      } catch (error) {
        console.error("Error fetching trending persons:", error);
        // Handle error state if needed
      }
    };

    fetchPersons();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div div className="container">
      <div className="row mt-4 mx-1">
        <div className="col-md-4 p-3 bg-gradient">
          <style>
            {`
              @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&family=Monoton&display=swap');
            `}
          </style>
          <h1 className="test py-2">Trending</h1>
          <h1 className="test py-2">Person</h1>
          <h1 className="test py-2">to Watch Now</h1>
        </div>
        {personContainer.slice(0, 10).map((person) => (
          <div className="col-md-2" key={person.id}>
            <div className="position-relative rounded-3">
              <Link to={`/Persondet/${person.id}`}>
                <img
                  className="w-100 rounded-3"
                  src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                  alt={person.original_name}
                />
              </Link>
              <h5 className="py-2">{person.original_name}</h5>
              <div className="rate position-absolute rounded-circle top-0 end-0 bg-black p-1 m-1">
                {person.popularity.toFixed(1)}
              </div>
            </div>
          </div>
        ))}
        <nav aria-label="Page navigation example" className="d-flex justify-content-center my-5">
          <ul className="pagination mx-2">
          <li className="page-item underlinee rounded-5 mx-2">
  <button className="btn mx-2 underlinee text-white" onClick={handlePrevPage} disabled={currentPage === 1}>
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
    </div>
  );
};

export default People;

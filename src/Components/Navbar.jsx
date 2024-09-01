import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { grid } from 'ldrs';

// Register the grid component
grid.register();

const Navbar = (props) => {
  let navigate = useNavigate();

  function logout() {
    props.setislogin(false);
    navigate('/Login');
    localStorage.removeItem('token');
  }

  return (
    <nav className="navbar navbar-expand-md navbar-dark">
      <div className="container-fluid">
        <a className="navbar-brand fs-4 mx-5" href="#">
      <span className="strikethrough">Telema</span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {!props.islogin ? (
              <>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? 'active nav-link text-danger' : 'nav-link'
                    }
                    to="login"
                  >
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? 'active nav-link text-danger' : 'nav-link'
                    }
                    to=""
                  >
                    Register
                  </NavLink>
                </li>
              </>
            ) : (
              ''
            )}

            {props.islogin ? (
              <>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? 'active nav-link text-danger' : 'nav-link'
                    }
                    to="Home"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? 'active nav-link text-danger font-weight-bold' : 'nav-link'
                    }
                    to="Movies"
                  >
                    Movies
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? 'active nav-link text-danger' : 'nav-link'
                    }
                    to="TvShow"
                  >
                    TV Show
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? 'active nav-link text-danger' : 'nav-link'
                    }
                    to="People"
                  >
                    People
                  </NavLink>
                </li>
               
              </>
            ) : (
              ''
            )}
          </ul>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item mx-2">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? 'active nav-link text-danger ' : 'nav-link'
                    }
                    to="FavoriteMoviesPage"
                  >
<i class="fa-solid fa-bookmark"></i>                  </NavLink>
                </li>
            {props.islogin ? (
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {props.username}
                </button>
                <ul className="dropdown-menu">
                  <li className="nav-item" onClick={logout}>
                    Logout
                  </li>
                </ul>
              </div>
            ) : (
              ''
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

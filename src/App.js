import React, { useState,useEffect,createContext} from 'react';
import './App.css';
import About from '../src/Components/About';
import Layout from './Components/Layout';
import Errormsg from './Components/Errormsg';
import Home from './Components/Home';
import Login from './Components/Login ';
import Register from './Components/Register'
import Movies from './Components/Movies';
import TvShow from './Components/TvShow';
import People from './Components/Poeple'; // Corrected spelling
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ReactLoading from "react-loading";
import Moviesdetails from './Components/Moviesdetails';
import Tvdetails from './Components/Tvdetails';
import { jwtDecode } from 'jwt-decode';
import Persondet from './Components/Persondet';
import FavoriteMoviesPage from './Components/FavoriteMoviesPage';
export const NumViewContext = createContext();
function App() {
    let [islogin,setislogin] =useState (false);
    let [username, setusername ] =useState ('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoriteMovies(storedFavorites);
  }, []);

  const updateFavoriteMovies = (movies) => {
    localStorage.setItem("favorites", JSON.stringify(movies));
    setFavoriteMovies(movies);
  };
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <Layout username={username} islogin={islogin} setislogin={setislogin}/>,
      children: [
        { index: true, element: islogin ? <Home /> : <Register /> },
        { path: 'Home', element: <Home /> },
        { path: 'About', element: <About /> },
        { path: 'Login', element: <Login islogin={islogin}   setislogin={setislogin} /> },
        { path: 'Moviesdetails/:movieid', element: <Moviesdetails /> },
        { path: 'Tvdetails/:tvid', element: <Tvdetails /> },
        { path: 'Movies', element: <Movies /> },
        { path: 'TvShow', element: <TvShow /> },
        { path: 'FavoriteMoviesPage', element: <FavoriteMoviesPage /> },
        { path: 'People', element: <People />}, // Corrected spelling
        { path: 'Persondet/:personid', element: <Persondet /> },
        { path: '*', element: <Errormsg /> },
      ]
    }
  ]);
  useEffect(() => {
  if ( localStorage.getItem('token')){
    
let token = localStorage.getItem('token') ;
let usernameinfo = jwtDecode(token);
setusername( usernameinfo.first_name);
// console.log(usernameinfo.first_name);     
setislogin(true) 
  }
  }, [islogin]);




  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400); // Change the time to simulate loading time
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
     <NumViewContext.Provider value={{ favoriteMovies, updateFavoriteMovies }}>
      {isLoading ? (
        <div className="loading-container">
          <Loading />
        </div>
      ) : (
        <RouterProvider router={routes} />
      )}
              </NumViewContext.Provider>

    </>
  );
}

export default App;

function Loading() {
  return (
    <div className='text-center d-flex justify-content-center align-items-center vh-100'>
      <style>
@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300..700&family=Monoton&display=swap')
</style>
      <div className='d-flex flex-column justify-content-center align-items-center'>
        <h2 className='test'>movie</h2>
        <ReactLoading type="bars" color="white" height={100} width={75} />
      </div>
    </div>
  );
}


import React from 'react'
import Navbar from './Navbar';

import { Outlet } from 'react-router-dom';
const Layout = (props) => {
  return (
    <>
    <Navbar username={props.username} setislogin={props.setislogin}   islogin={props.islogin} />
   <Outlet/>
    </>
  )
}

export default Layout;

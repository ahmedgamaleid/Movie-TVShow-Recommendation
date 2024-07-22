import React from 'react';
import error from '../img/error.png';

const Errormsg = () => {
  return (
    <div className='container d-flex justify-content-center align-items-center vh-100'>
      <img src={error} alt="Error" className='w-75 h-100'/>
    </div>
  );
};

export default Errormsg;

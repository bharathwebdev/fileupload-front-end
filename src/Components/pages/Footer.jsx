import React from 'react'
import { NavLink } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css';

function Footer() {
  return (
    <div className='bg-slate-50 text-white flex justify-center items-center ' style={{
        height:"10vh",
        color:"black",
        
    }}> 

<div className="contact-info ml-5 ">
      <h3 className='text-blue-600 text-slate-700'>Contact Information</h3>
      <span className='inline text-gray-500'>Email : </span>
      <p className='text-gray-500 inline'> bharath1811786@gmail.com</p>
      {/* <p className='text-blue-500 font-medium' >Phone: 123-456-7890</p> */}
    </div>
 

    <div className="footer-bottom  text-center place-self-center flex-1">
    <p className='text-gray-500 '>&copy; 2023 fileupload.com.All rights reserved.| <NavLink href="/#" className='text-blue-600'>Privacy Policy</NavLink> | <NavLink to="/#" className='text-blue-600'>Terms of Use</NavLink></p>
  </div>
  <div className='p-4'>
    <h2 className='text-blue-600 mb-1 font-bold text-center'>Socials</h2>
  <div className="social-icons flex gap-3 ">
      <a href="#" className="icon"><i className='fab fa-facebook text-gray-700 text-lg'></i></a>
      <a href="#" className="icon"><i className="fab fa-twitter text-gray-700 text-lg"></i></a>
      <a href="#" className="icon"><i className="fab fa-instagram text-gray-700 text-lg"></i></a>
    </div>
  </div>

    </div>
  )
}

export default Footer
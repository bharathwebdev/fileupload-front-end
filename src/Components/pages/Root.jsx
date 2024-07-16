import React from 'react'
import Nav from '../SideNav/Nav'
import Footer from './Footer'

function Root() {
  return (
    <div className=''>
        <div style={{
            height:"80%"
        }}>
        <Nav/>
        </div>
        <div style={{
            height:"20%"
        }}>
        <Footer/>
        </div>
       
        

    </div>
  )
}

export default Root
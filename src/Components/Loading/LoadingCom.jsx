import React, { useContext } from 'react'
import "../Loading/Loading.css"
import { UserContext } from '../../hooks/Context'
function LoadingCom() {

    const {isloading} = useContext(UserContext);
  return (
    <div  className={`bg-transparent backdrop-blur-sm absolute w-full h-full top-0  flex justify-center items-center z-20  ${!isloading && "noload" } `}>
       
        <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            </div>
        </div>
       
  
  )
}

export default LoadingCom
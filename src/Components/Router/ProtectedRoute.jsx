// ProtectedRoute.js
import React, { useContext, useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import { isAuthenticated } from '../Auth/AuthenticationConfig';
import { UserContext } from '../../hooks/Context';
import LoadingCom from '../Loading/LoadingCom';

const ProtectedRoute = ({children}) => {

  const [isAuth,setisAuth]=  useState(null);
  // const {setLoading,isloading} = useContext(UserContext);
  const [load,setload]= useState(true)

  useEffect(()=>{
     async function getAuth(){
        const res=  await isAuthenticated();
        setisAuth(res)
        setload(false)
      }
      getAuth()
  },[])

  if(load){
    return <LoadingCom/>
  }

  return (
    <>
    {
        isAuthenticated ? children : redirect("/login")
    }
    </>
 
  );
};

export default ProtectedRoute;

import React, { useEffect, useState } from "react";
import BasicModal from "../fileUpload/fileupload";
import { useContext } from "react";
import { UserContext } from "../../hooks/Context";
import { NavLink, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import FolderIcon from "@mui/icons-material/Folder";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { Outlet } from "react-router-dom";
import { redirect } from "react-router-dom";
import { isAuthenticated } from "../Auth/AuthenticationConfig";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import "../SideNav/Nav.css"

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import MenuIcon from '@mui/icons-material/Menu';
import api from "../api/AxiosApi";

function Nav() {

  const { open, setOpen, setUser, setData, setTableName, setTitle, title,filterBykeyword,user,setLoading ,openNav} = useContext(UserContext);
  const [authenticated, setAuthenticated] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(openNav)
  const [roleName, setRolename] = useState(null)
  let { subject, role, firstname } = sessionStorage.getItem("user") !== null && JSON.parse(sessionStorage.getItem("user"));

 useEffect(()=>{
  async function checkAuthentication() {
    try {
      setLoading(true)
      const isAuthenticatedResult = await isAuthenticated();
      setAuthenticated(isAuthenticatedResult);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);  
    }
  }

  checkAuthentication();
 },[])

 useEffect(()=>{
  setIsNavOpen(openNav)
 },[openNav])

 useEffect(()=>{
 console.log("use Effect auth ",authenticated)
  if(authenticated){
    if(role){
      setRolename(role[0]);
    }

  }
 },[authenticated])

  
  const logout = async() => {
    setLoading(true)
    sessionStorage.clear()
    try{
      
      const response  =await api.post("/api/v2/logout")
      // console.log(response.data);
      const isAuthenticatedResult = await isAuthenticated();
    setAuthenticated(isAuthenticatedResult);
    setLoading(false)
    }catch(e){
        console.error(e)
    }
   
    // Cookies.remove("bearerToken")
    setIsNavOpen(true)
    setUser(null)
    setData(null)
    setTableName(null)
    setTitle([])

    redirect("/")

  }

  
  


  const style = ({ isActive }) => {
    // console.log(isActive)
    return isActive ? `bg-blue-600 text-white  rounded-full block ml-auto   ${isNavOpen && "w-36 "}  mr-auto cursor-pointer ` : `hover:bg-slate-200  rounded-full block ml-auto  ${isNavOpen && "w-36 "} mr-auto cursor-pointer ${!isNavOpen && "bg-slate-200 "}  `
  };


  const handleNavClose = () => {
    setIsNavOpen(pre => !pre)
  }
 


  return (
    <div className="flex" style={{

      height:"90vh"
    }} >

      <div className="bg-slate-50 " >

    {!isNavOpen && <div  onClick={handleNavClose}
           >
            <div className="flex gap-1 p-1   items-center justify-center ">
              <MenuIcon className="p-2 bg-slate-200 rounded-full hover:bg-blue-600 hover:text-white"
                sx={
                  { fontSize: "50px" ,
                  cursor:"pointer"
                  
                }
                } />
         
            </div>
    </div>}
    
        {authenticated && <div className="p-3 flex gap-3 bg-slate-50 justify-center">
          {/* <Avatar ><strong>{firstname[0]}</strong></Avatar> */}

          <Avatar alt={firstname?.toUpperCase()} src="http://broke"
            sx={
              {
                width: 56,
                height: 56,
                background: "#1f4bff",
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
              }

            }
          />


          {isNavOpen && <div className="mt-1">
            <div className="flex gap-1  items-center">
              <h1 className="text-slate-600 font-bold drop-shadow-xl">{firstname?.charAt(0).toUpperCase() + firstname?.slice(1)}</h1>
              <VerifiedIcon className="text-blue-600 drop-shadow-xl"
                sx={
                  { fontSize: "20px" }
                } />
            </div>

            <p className="text-blue-600 text-sm cursor-pointer font-bold drop-shadow-xl">
              {authenticated && subject}
            </p>
          </div>}
          {isNavOpen  &&    <div onClick={handleNavClose}>
          <ArrowBackIosIcon className="mt-4 text-slate-700" sx={{
            cursor:"pointer",
            textAlign:"center"
          }}
           />
          </div>}

        </div>}



        <div className={`${isNavOpen && "w-56"}  min-w-full bg-blue-600 p-1 flex flex-col   gap-5`}
          style={
            { background: "#F6F9FC" }
          }>

          {!authenticated && <NavLink to="/login"
            className=" w-36 cursor-pointer ml-auto mr-auto pt-3">

            <div className="flex gap-2 p-3 rounded-full  items-center  justify-center bg-slate-200 ">
              <LoginIcon className="rounded-full text-blue-600 "
                sx={
                  { fontSize: "25px" }
                } />
              <h1 className="text-black font-bold text-blue-600">Login</h1>
            </div>

          </NavLink>}

          {!authenticated && <NavLink to="/signup"
            className="ml-auto w-36 mr-auto cursor-pointer">
            <div className="flex gap-2 p-3 rounded-full bg-slate-50 items-center  justify-center hover:bg-slate-200">
              <PersonAddAlt1Icon className="text-black"
                sx={
                  { fontSize: "25px" }
                } />
              <h1 className="text-black ">Sign up</h1>
            </div>
          </NavLink>}



          {(authenticated && roleName && roleName=="ADMIN") && <div className={`cursor-pointer ${isNavOpen && "w-32"} ml-auto mr-auto cursor-pointer `}>
            {/* <img className='w-10' src={addDocument} onClick={()=>setOpen(pre=>!pre)}/> */}
            <div className="flex gap-2 p-3 rounded-2xl bg-white items-center shadow-md justify-center hover:bg-slate-50"
              onClick={
                () => setOpen(true)
              }>
              <AddIcon className="text-blue-600 "
                sx={
                  { fontSize: "30px" }
                } />
        { isNavOpen &&    <h1 className="text-blue-600 ">New
              </h1> }
            </div>
            <BasicModal />
          </div> }


          <NavLink 
            to="/" className={style} id="files"  title="files">
            {/* <img className='w-10' src={folder}/> */}
            <div className="flex gap-2 p-3 rounded-full  items-center  justify-center ">
              <FolderIcon className=""
                sx={
                  { fontSize: "25px" 
                }
                }
              />
            <h1 className={`${!isNavOpen && "hidden"}`}> Files</h1>
            </div>
            
          </NavLink>

         

          <NavLink to="/search" id="files"  title="search"
            className={style} >
            <div className="flex gap-2 p-3 rounded-full  items-center  justify-center " >
              <SearchIcon className=""
                sx={
                  { fontSize: "25px" }
                } />
          {isNavOpen && <h1 className="">Search</h1>}    
            </div>
          </NavLink>

     

       {/* { (authenticated && filterBykeyword?.length>0)  && <div  className="cursor-pointer bg-slate-200 rounded-full m-auto"
             id="download"  title="download">
            
            <div className="flex gap-2 p-3 rounded-full  items-center  justify-center " onClick={exportToExcel}>
              <DownloadIcon className=""
                sx={
                  { fontSize: "25px" 
                }
                }
              />
            <h1 className={`${!isNavOpen && "hidden"}`}> Download</h1>
            </div>
            
          </div> } */}



          {authenticated && <div className={`hover:bg-slate-200 rounded-full block ml-auto  ${isNavOpen && "w-36 " }  mr-auto cursor-pointer ${!isNavOpen && "bg-slate-200"} `} onClick={logout}
           >
            <div className="flex gap-2 p-3 rounded-full bg-slate-50 items-center  justify-center hover:bg-slate-200">
              <LogoutIcon className=""
                sx={
                  { fontSize: "25px" ,
                }
                } />
         {  isNavOpen &&   <h1 className="text-black ">Logout</h1>}
            </div>
          </div>}


     

        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Nav;

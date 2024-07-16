import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../hooks/Context'
import axios from 'axios';
import file from "../../assets/file.png"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import LoadingCom from '../Loading/LoadingCom';
import FileCard from './FileCard';
import { Card } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TuneIcon from '@mui/icons-material/Tune';
import api from '../api/AxiosApi';

function FileList() {
const {setAllfiles,allfiles,setTableName,setoffset} = useContext(UserContext);
const [innerDataAllFile,setInnerDataAllFile] = useState(allfiles)
const {uploadStatus,setUploadStatus}=useContext(UserContext)

const navigate  = useNavigate();
useEffect(()=>{
  try{
    api.get("api/v2/getallfiles")
    .then(res=>{
     setAllfiles(res?.data);
     setInnerDataAllFile(res?.data);
    });
  }catch(error){
   console.log(error)
  }


},[uploadStatus])


const handleChange = (e)=>{
   const val = e.target.value;
   const filteredData = innerDataAllFile.filter(data=>{
    return data.table_name.includes(val) && data ;
   })
   if(filteredData.length===0){
    setAllfiles(innerDataAllFile)
   }else{
    setAllfiles(filteredData)
   }
   

}

  return (
    <div className='w-full  bg-slate-50 flex flex-col'>

        <div className='w-full bg-slate-50 p-2 flex-none flex items-center justify-center'>
     

    <div className="relative bg-slate-200 rounded-full h-16  w-1/2" style={{
            background:"#EDF2FC"
         }}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none" >
        <SearchIcon className='w-5 h-5 text-gray-500' />
      </div>
      <input type="text" className="h-16 w-20 border-none focus:ring-0 focus:outline-none w-full p-2 pl-10 bg-slate-200 rounded-full text-black sm:text-md focus:shadow-md placeholder:Google Sans placeholder:text-black  sm:text-md focus:shadow-md " placeholder="Search..." style={{
            background:"#EDF2FC"
      }} onChange={handleChange} />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        {/* <TuneIcon className='w-5 h-5 text-gray-500' /> */}
      </div>
    </div>





          </div>


        <div  className='w-full  p-3 h-full rounded-2xl bg-white'>
            <div className='flex flex-wrap gap-3 m-10 height-screen width-full'>
        {allfiles.map((el,index)=>{
          if(el.table_name!=="users_data") {
            return <FileCard key={index}  name={el.table_name} />
          } 
       })}

   
      
     
       </div>

        </div>


    </div>
  )
}

export default FileList
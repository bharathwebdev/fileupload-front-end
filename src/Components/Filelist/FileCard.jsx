import React, { useContext } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { UserContext } from '../../hooks/Context';
import { useNavigate } from 'react-router-dom';
import LongMenu from './Menu';
function FileCard({name}) {

    const {setTableName,setoffset} = useContext(UserContext);
    const navigate = useNavigate();
    const handleClick=(tableName)=>{
        // console.log(tableName);
        setTableName(tableName)
        setoffset(1)
        navigate("/search")
        
        }

  return (
    // onClick={()=>handleClick(name)}
    <div onClick={()=>handleClick(name)}>
        <div className='flex bg-slate-200 w-60 gap-5 p-4 rounded-2xl hover:shadow-md cursor-pointer' >
        <InsertDriveFileIcon className='flex-none w-14 h-14 '/>
    
           <h1 className='flex-initial w-64'>{name}</h1>
           {/* <div className='flex-initial w-10'>
           <LongMenu />

           </div> */}
           <MoreVertIcon className='flex-initial w-10 '/>
        </div>
    </div>
  )
}

export default FileCard
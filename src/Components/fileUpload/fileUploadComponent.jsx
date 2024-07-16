import React, { useEffect, useState } from 'react'
import "../fileUpload/fileupload.scss"
import { useContext } from 'react'
import { UserContext } from '../../hooks/Context'
import axios from 'axios'
import LoadingCom from '../Loading/LoadingCom'
import { toast } from 'react-toastify'
import { useRef } from 'react'
import filepng from '../../assets/file.png'
import { useNavigate } from 'react-router-dom'
import GetToken from '../Auth/GetToken'
import Swal from 'sweetalert2'
import CancelIcon from '@mui/icons-material/Cancel';
import api from '../api/AxiosApi'
function FileUploadComponent() {
    const {open,setOpen,setLoading,uploadStatus,setUploadStatus}=useContext(UserContext)
    
    const navigate  = useNavigate()
    const [file,setfile] = useState(null);
    const inputRef = useRef(null);

    const handleUpload=(e)=>{
        e.preventDefault()
    //   console.log(file)
        if (file) {
            setLoading(true)
            const formData = new FormData();
            formData.append('file', file);
            const bearerToken = GetToken();
                 // console.log(tableName)
    
            // You can send the formData to your server using an API request
            // Example using fetch:
            api.post("/api/v2/excelToPostgres?thread=true",formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                   
                  }
                  
            }).then(response => {
                // Handle response from the server
                console.log('Upload successful:', response.data);
                Swal.fire(
                    'Success',
                    'File uploaded successfully ',
                    'success'
                  )
                }
              )
              .catch(error => {
                // Handle upload error
                console.error('Upload error:', error);
                setUploadStatus("error")
                toast.error("File upload failed !", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    });
                }
              ).finally(()=>{
                setLoading(false)
              });
    }else{
        toast.info("please select file" ,{
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            })
    }
    }

    const handleChange=(e)=>{
        console.log(e.target.files[0])
       setfile(e.target.files[0])
    }

    const reSetForm = ()=>{
        setOpen(false)
        setUploadStatus(null)
        setfile(null)
        inputRef.current.value = null;
    }

    const handleDrop = (e)=>{
   e.preventDefault()
        const { files } = e.dataTransfer;
        console.log(files)
        const file = files[0];
         setfile(file)
    }
    const handleDragOver = (event) => {
        event.preventDefault()
      }
  return (
    <div>
    <div className="modal">
	<div className="modal-header">
		<div className="modal-logo">
			<span className="logo-circle">
				<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="512" height="419.116" viewBox="0 0 512 419.116">
					<defs >
						<clipPath id="clip-folder-new">
							<rect width="512" height="419.116" />
						</clipPath>
					</defs>
					<g id="folder-new"  clipPath="url(#clip-folder-new)">
						<path id="Union_1" data-name="Union 1" d="M16.991,419.116A16.989,16.989,0,0,1,0,402.125V16.991A16.989,16.989,0,0,1,16.991,0H146.124a17,17,0,0,1,10.342,3.513L227.217,57.77H437.805A16.989,16.989,0,0,1,454.8,74.761v53.244h40.213A16.992,16.992,0,0,1,511.6,148.657L454.966,405.222a17,17,0,0,1-16.6,13.332H410.053v.562ZM63.06,384.573H424.722L473.86,161.988H112.2Z"fill="var(--c-action-primary)" stroke="" strokeWidth="1" />
					</g>
				</svg>
			</span>
         
		</div>
		<button className="btn-close" onClick={reSetForm}>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
				<path fill="none" d="M0 0h24v24H0V0z" />
				<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="var(--c-text-secondary)" />
			</svg>
		</button>
	</div>
   
    <form onSubmit={handleUpload}>
	<div className="modal-body" onDrop={handleDrop} onDragOver = {handleDragOver}>
		<h2 className="modal-title">Upload a file</h2>
		<p className="modal-description">Attach the file below</p>
        {file &&   <div className='flex gap-1 justify-center items-center border border-red mt-3 p-2  border-black-200  '>
        <img className='w-10' src={filepng}/>
        <h1>{file.name}</h1>
        <div onClick={()=>setfile(null)}>
        <CancelIcon className='text-blue' />
            </div>

       </div>

        }
     
		<button type='button'  >
              <label htmlFor="file"  className="upload-area ">
			<span className="upload-area-icon">
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="340.531" height="419.116" viewBox="0 0 340.531 419.116">
					<g id="files-new" clipPath="url(#clip-files-new)">
						<path id="Union_2" data-name="Union 2" d="M-2904.708-8.885A39.292,39.292,0,0,1-2944-48.177V-388.708A39.292,39.292,0,0,1-2904.708-428h209.558a13.1,13.1,0,0,1,9.3,3.8l78.584,78.584a13.1,13.1,0,0,1,3.8,9.3V-48.177a39.292,39.292,0,0,1-39.292,39.292Zm-13.1-379.823V-48.177a13.1,13.1,0,0,0,13.1,13.1h261.947a13.1,13.1,0,0,0,13.1-13.1V-323.221h-52.39a26.2,26.2,0,0,1-26.194-26.195v-52.39h-196.46A13.1,13.1,0,0,0-2917.805-388.708Zm146.5,241.621a14.269,14.269,0,0,1-7.883-12.758v-19.113h-68.841c-7.869,0-7.87-47.619,0-47.619h68.842v-18.8a14.271,14.271,0,0,1,7.882-12.758,14.239,14.239,0,0,1,14.925,1.354l57.019,42.764c.242.185.328.485.555.671a13.9,13.9,0,0,1,2.751,3.292,14.57,14.57,0,0,1,.984,1.454,14.114,14.114,0,0,1,1.411,5.987,14.006,14.006,0,0,1-1.411,5.973,14.653,14.653,0,0,1-.984,1.468,13.9,13.9,0,0,1-2.751,3.293c-.228.2-.313.485-.555.671l-57.019,42.764a14.26,14.26,0,0,1-8.558,2.847A14.326,14.326,0,0,1-2771.3-147.087Z" transform="translate(2944 428)" fill="var(--c-action-primary)" />
					</g>
				</svg>
			</span>
            
			<span className="upload-area-title">Drag file(s) here to upload.</span>
			<span className="upload-area-description">
				Alternatively, you can select a file by <br />
                <strong className='cursor-pointer'>clicking here</strong>
                <input onChange={handleChange}  ref={inputRef} className='opacity-0' type='file' name="file" id='file'/>
			</span>
            </label>
		</button>
      
	</div>
	<div className="modal-footer">
		<button type='button'  className="btn-secondary" onClick={reSetForm}>Cancel</button>
		<button type='submit' className="btn-primary" >Upload File</button>
	</div>
    </form> 
    </div>
    </div>
  )
}

export default FileUploadComponent
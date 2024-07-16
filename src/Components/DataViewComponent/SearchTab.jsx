import React, { useContext, useState, useRef, useCallback, useEffect } from "react";
import { UserContext } from "../../hooks/Context";
import axios from "axios";
import { toast } from "react-toastify";
import { Input, TextField } from "@mui/material";
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from "react-router-dom";
import ExcelJS from 'exceljs';

import api from "../api/AxiosApi";
import { isAuthenticated } from "../Auth/AuthenticationConfig";

import DownloadIcon from '@mui/icons-material/Download';



function SearchTab() {
  const { tableName, setLoading, offset, title,setData, setTitle,searchTerm, setSearchTerm,setTableName, setoffset, data, setDark,setOpenNav ,filterBykeyword ,setfilterBykeyword} = useContext(UserContext);
  const navigate = useNavigate();
  const [currentOffset, setCurrentOffset] = useState(offset)
  const maxOffset =Math.ceil (data?.totalRecords / 20);
  const rem = data?.totalRecords % 20;
  




  useEffect(() => {
    if (tableName && !data) {
      setCurrentOffset(offset)
      handleClick()
    }
  }, [])

  useEffect(() => {
    console.log("this is running ", data, " ", tableName)
    if (data && tableName) {
      handleClick()
    }
    // console.log(offset)
  }, [offset])

  useEffect(() => {
    if (currentOffset) {
      setoffset(parseInt(currentOffset))
    }

  }, [currentOffset])

  const handleClick = async (e) => {
    // console.log("im running")
    e?.preventDefault()
    // console.log(offset)
    // if(data){
    //   setOpenNav(false)
    // }

    // console.log(tableName)
    const isLoggedIn = await isAuthenticated();
    if (!isLoggedIn) {
      navigate("/login")
      return;
    }

    api.get("api/v2/getData", {
      params: {
        tableName,
        page: offset,
        pageSize: 20,
      }
    }
    ).then(function (response) {
      setData(response.data);
      // console.log(response.data)
      const title = Object.keys(response.data.data[0])?.map(key => {
        const val1 = key.replace("_", " ").slice(1);
        const val2 = key.charAt(0).toLocaleUpperCase();
        return val2.concat(val1);
      })

      setTitle(title);

    }).catch(function (error) {
        console.log(error)
        const errorCode = error.response?.status;
        if (errorCode == 404) {
          toast.error("file not found", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }

    }).finally(function () {
        setLoading(false);
      });

  }
  const handleChange = (e) => {
    setTableName(e.target.value);
  }

  const handlenext = (state) => {
    if (tableName) {
      if (offset > 0) {
        if (state === 1) {
          // setoffset(pre=>pre+1)

          if (currentOffset) {
            setCurrentOffset(pre => parseInt(pre) + 1)
          } else {
            setCurrentOffset(offset + 1)
          }

          console.log("im running", currentOffset)
        } else {
          if (currentOffset) {
            setCurrentOffset(pre => parseInt(pre) - 1)
          } else {
            setCurrentOffset(offset - 1)
          }
          // setoffset(pre=>pre-1)

        }
      }
    }

    
  }

  const handleDarkMode = () => {
    setDark(pre => !pre);
  }

  const handleOffsetChange = (e) => {
    if (e.target.value <= maxOffset && !(e.target.value < 0)) {
      setCurrentOffset(e.target.value)
    }

  }

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

  };

  
  const exportToExcel = async () => {
    const pretitle =title &&  title.map(t=>t?.toString().split(" ")?.join("_"));
    console.log("this is preTitler",pretitle)
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');
    
    const columns = pretitle.map(t=> ({ header: t.toUpperCase(), key: t.toLowerCase(), width: 10 }));

    worksheet.columns = columns;

    filterBykeyword.forEach(item => {
      worksheet.addRow(item);
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.xlsx';
    a.click();
    URL.revokeObjectURL(url);
  };
  // console.log(data.offset + data.limit )
  const totalrec = data?.offset + data?.limit > data?.totalRecords ? data?.offset + rem  : data?.offset + data?.limit;

  return (
    <div className="sticky flex justify-start " style={{
      userSelect: "none"
    }}>
      <form className=" p-2 flex justify-center items-center" onSubmit={handleClick}>
        <Input placeholder="Enter table name…" variant="outlined" color="primary" onChange={handleChange} value={tableName} required type="text" />


        <button className="p-2.5 ml-5 bg-blue-600 rounded-md text-white hover:bg-blue-700 " type="submit"> GET </button>

      </form>

      {data &&
        <div className="inline  w-full cursor-pointer ">


            <div className="flex gap-5 justify-evenly w-full   flex-wrap">


            
                      <div className="flex justify-center">
                           <input className="p-2 self-center border-2 border-blue-600 rounded-lg outline-0 customFilterClass"
                                   placeholder="Filter by keyword "
                                   value={searchTerm}
                                   onChange={handleSearch}
                           />
                      </div>



              <div className="flex  justify-evenly flex-wrap ">
                              <h1 className=" self-center font-medium">Page :</h1>
                                <input  type="number"
                                  className="w-20 m-2 p-2 font-medium  customtextnumber outline-0 "
                                  value={currentOffset}
                                  onChange={handleOffsetChange}
                                  max={maxOffset}
                                  min={1}
                                />
              </div>



              <div className=" self-center w-36 font-medium text-center text-gray-600">
                {data?.offset + 1} <p className="inline text-blue-600">-</p>  {totalrec} <p className="inline text-blue-600">of</p> {data.totalRecords}
              </div>

              <div className=" self-center flex justify-center items-center gap-5 w-30">

                {offset > 1 &&
                  <div className="inline  cursor-pointer " onClick={() => handlenext(0)}>
                    <ArrowBackIosNewIcon className="text-blue-600  hover:bg-blue-600 hover:text-white  rounded-full p-1 transition-all duration-300" sx={{
                      fontSize: "30px"
                    }} />
                  </div>}
    
                { data?.offset + 1 + data?.limit  <= data.totalRecords &&
                  <div className="inline " >
                    <ArrowForwardIosSharpIcon className="text-blue-600 hover:bg-blue-600 hover:text-white text-9xl rounded-full p-1 transition-all duration-300" sx={{ fontSize: "30px" }} onClick={() => handlenext(1)} />
                  </div>
                }
              </div>

              <div className="self-center bg-blue-600 p-2 text-white rounded-md" onClick={exportToExcel} >
              <DownloadIcon/>
                </div>

            </div>

        </div>
      }




    </div>

  )
}
export default SearchTab;
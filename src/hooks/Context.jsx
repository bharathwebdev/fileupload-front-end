import { useState, createContext, useContext } from "react";
import SearchTab from "../Components/DataViewComponent/SearchTab";
import {DummyData} from "../Data/data"
export const UserContext = createContext();

export function DataProvider ({children}){
    const [data,setData] = useState(null);
    const [user,setUser] = useState(null);
    const [tableName,setTableName] = useState("");
    const [offset,setoffset] = useState(1);
    const [title,setTitle] = useState([]);
    const [isloading,setLoading] = useState(false);
    const [Dark,setDark] = useState(false);
    const [allfiles,setAllfiles] = useState([]);
    const [open, setOpen] = useState(false);
    const [openNav,setOpenNav] = useState(true);
    const [searchingFilename,setSearchingFilename] = useState(null)
    const [uploadStatus,setUploadStatus] = useState(null)
    const [filterBykeyword,setfilterBykeyword] = useState([])
    const [searchTerm, setSearchTerm] = useState('');

    return (

        <UserContext.Provider value={{
            data,
            tableName,
            searchingFilename,
            filterBykeyword,
            uploadStatus,
            setUploadStatus,
            searchTerm,
            open,
            setSearchTerm,
            offset,
            title,
            isloading,
            allfiles,
            setData,
            setTableName,
            setOpen,
            setAllfiles,
            openNav,
            setOpenNav,
            setoffset,
            setSearchingFilename,
            setTitle,
            setLoading,
            setfilterBykeyword,
            setDark,
            Dark,
            setUser,
            user
            }}>
   {children}
        </UserContext.Provider>
    )


}


import axios from "axios";
import { useContext, useState } from "react";
import "../DataViewComponent/Tableinfo.css"
import SearchTab from "./SearchTab";
import Table from "./Table";
import Homeimage from "../../assets/home.jpg";
import { UserContext } from "../../hooks/Context";
import HomeAvatar from '../../assets/searchAvatar.jpg'
import { isAuthenticated } from "../Auth/AuthenticationConfig";
import TableFooter from "./TableFooter";

function TableInfo(){
 
const {Dark,data} = useContext(UserContext);




    return (
        <div className={`m-4 Container backgroundImag w-full   ${Dark && "dark" }   ${data && "nobg"} flex flex-col `} style={{
            height:"700px",
            justifyContent:"space-between"
        }}>
            <div className="">
            <SearchTab/>
            </div>
         
            <div className="">
            <Table/> 
            </div>
        
            <div className=" flex  items-end m-auto h-full ">
            <TableFooter/>
            </div>
           
            {/* <img className="w-full" src={Homeimage}/> */}
     
     </div>

    )
}

export default  TableInfo;
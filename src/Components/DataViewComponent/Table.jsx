import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../hooks/Context";
import LoadingCom from "../Loading/LoadingCom";
import notFoundImg from "../../assets/notfound.jpg"

function Table(){
    const {data,isloading,title,filterBykeyword,setfilterBykeyword,searchTerm} = useContext(UserContext);
   //  const [tableData,settableData] = useState([]);
    useEffect(()=>{
      setfilterBykeyword(data?.data)
    },[data])



useEffect(()=>{
   if(data?.data){
    setfilterBykeyword(data?.data.filter(data=>{
      for (const key in data) {
          if(data[key].toString().toLowerCase().includes(searchTerm.toLowerCase())){
            return true
          }
        }
        return false;
      }
      
    )
     )
   }
 },[data,searchTerm])


   //  if(isloading){
   //    return <LoadingCom/>
   //  }

    const highlightText = (text, searchTerm) => {
      if (!searchTerm) {
        return text;
      }
      const inputData = searchTerm.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(inputData, 'gi');
      const parts = [];
      let match;
      let lastIndex = 0;
  
      while ((match = regex?.exec(text)) !== null) {
        parts?.push(text?.slice(lastIndex, match?.index));
        parts?.push(<span key={match?.index} className="highlight">{match[0]}</span>);
        lastIndex = match?.index + match[0].length;
      }
      parts?.push(text?.slice(lastIndex));
      return parts;
    };


    // console.log({data,title,isloading});
    return (
       <div className="mt-7 h-full ">
      
                   {!isloading && <table className=" w-full  border-collapse  border border-slate-500 table-auto text-center text-lg " >
                   <caption className="caption-top">
    
        </caption>
        <thead>
                <tr>
   
                      {filterBykeyword?.length>0 && title.map((el,i)=><th key={i} className="border text-blue-600">{el}</th>)}
                </tr>
                </thead>
                <tbody>
             {(filterBykeyword && data)&&
               filterBykeyword.map((obj,i)=>{
                    return <tr key={i}  className="text-base">
                          {Object.keys(data.data[0]).map((el,index)=>{
                          return <td key={index} className="border  items-center">{ highlightText(obj[el]?.toString(), searchTerm)}</td>
                        //   return <td key={index} className="border  items-center">{obj[el]}</td>
                })}
                    </tr>
                })
             }
             
               </tbody>
            
             
            </table>}
            <div>
            {
              (filterBykeyword?.length===0)  &&
               <img src={notFoundImg} alt="not found" className="notfound"/>
             }
                 </div>
       </div>
    )
}
export default Table;
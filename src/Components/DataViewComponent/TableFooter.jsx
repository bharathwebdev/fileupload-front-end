import React, { useContext } from 'react'
import { UserContext } from '../../hooks/Context';

function TableFooter() {
    const {data}=useContext(UserContext);
    const maxOffset =Math.ceil (data?.totalRecords / 20);
    const rem = data?.totalRecords % 20;

  return (
    <div className='p-2 '>
         {data &&     
            <div className="self-center" >
                <h1 className="font-medium ">Total page : {maxOffset}</h1>
                </div>
            }
          
    </div>
  )
}

export default TableFooter
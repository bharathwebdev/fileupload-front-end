import React from 'react'
import Nav from '../SideNav/Nav'
import TableInfo from './TableInfo'
import { Alert } from '@mui/joy'

function DataViewContainer() {
  return (
        <div className='flex justify-between  w-full h-screen' >
            {/* <Nav className="flex-none"/> */}
   
            <TableInfo className="flex-initial w-64 "/>
        
            </div>
   
  )
}

export default DataViewContainer
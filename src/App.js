import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import TableInfo from './Components/DataViewComponent/TableInfo';
import Nav from './Components/SideNav/Nav';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DataViewContainer from './Components/DataViewComponent/DataViewContainer';
import FileList from './Components/Filelist/FileList';
import LoadingCom from './Components/Loading/LoadingCom';




function App() {

  const [data,setData] = useState(null);

  useEffect(()=>{

  },[]);

  return (
    <div className="App">
       {/* <LoadingCom/> */}
  <div className='flex'>
    {/* <Nav/> */}
{/* 
    <Switch>
    <Route path="/" element={<FileList/>}/>
    <Route path='/search' element={<DataViewContainer/>}/>
    <Route path='/login' element={<Login/>}/>
    </Switch> */}
   
  </div>

 

    </div>
  );
}

export default App;

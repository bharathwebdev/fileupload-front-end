import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { DataContext, UserContext } from './hooks/Context';
import { DataProvider } from './hooks/Context';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Nav from './Components/SideNav/Nav';
import ErrorPage from './Components/Error/PageError';
import DataViewContainer from './Components/DataViewComponent/DataViewContainer';
import FileList from './Components/Filelist/FileList';
import SignIn from './Components/pages/LoginForm';
import ProtectedRoute from './Components/Router/ProtectedRoute';
import SignUp from './Components/pages/SignUp';
import LoadingCom from './Components/Loading/LoadingCom';
import Root from './Components/pages/Root';
const router = createBrowserRouter([
  {
    path: "/",
    element:  <Root/>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/search",
        element: <ProtectedRoute>
                        <DataViewContainer/>
                 </ProtectedRoute>,
      },
      {
        path: "/",
        element: <FileList/>,
      },
      {
        path: "/setting",
        element: <h1>settings</h1>,
      },
    ]
    ,
  },
  {
    path:"/login",
    element:<SignIn/>
  },  {
    path:"/signup",
    element:<SignUp/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(


  // <React.StrictMode>
//  <BrowserRouter>


//     <App />


// </BrowserRouter>
 <DataProvider>
   <ToastContainer/>
<RouterProvider router={router} />
<LoadingCom/>
  </DataProvider>
   
  // </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

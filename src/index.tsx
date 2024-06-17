import "bootstrap/scss/bootstrap.scss";
import "assets/scss/paper-kit.scss?v=1.3.0";
import "assets/demo/demo.css?v=1.3.0";
import 'react-toastify/dist/ReactToastify.css'; 

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Token from './config/api/token'
import { ToastContainer } from 'react-toastify';
import {loggedRoutes, guestRoutes} from './routes';


type routeType= {
  path: string;
  Component: any;
}

const App: React.FC = () =>{
 
 const login = Token.check();


 return (
 
  <BrowserRouter basename={`/`}>
       
        {
          login ?
             <Routes>
              {loggedRoutes.map( ({path,Component}:routeType) => (
                <Route key={path}   path={path} element={<Component />} />      

              ))}
              <Route  path="/*" element={<Navigate to="/home" replace />} />

            </Routes>
          :
          <>     
          <Routes>
            {guestRoutes.map(({path, Component}: routeType)=>{
              return(
                  <Route  key={path} path={path} element={<Component />}/>
                )
            })}
            <Route  path="/*" element={<Navigate to="/home" replace />} />
          </Routes>
          </>
        }
               
         </BrowserRouter>
  )
}

ReactDOM.render(<>
  <App />
  <ToastContainer />
</>, document.getElementById('root'));



import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import homePage from "./Components/"


const App = () => {
  const location = useLocation();
  return(
      <div className = "App">{
        <MyRoutes/>
    }</div>
  )
  }


const MyRoutes = () => {
  return(
    <Routes>
      <Route path = "/" element = {<home />}/> 
    </Routes>
  )
}

export default App;

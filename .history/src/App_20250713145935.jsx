import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";

const App = ( )=> {
  const location = useLocation();

  return(
      <div className = "App">{
        <MyRoutes/>
    }</div>
  )
  }

export default App;

const MyRoutes = () => {
  return(
    <Routes>
      <Route></Route>
    </Routes>
  )
}
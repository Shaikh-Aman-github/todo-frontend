import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import "./App.css";
import Login from "./component/login";
import Register from "./component/register";
import Error from "./Page/Error";
import Home from "./Page/Home";
import Protected from './protectRoute'


function App() {
  return (
    <div className="App">
        <Router>
            <Routes>
              <Route  path="/" element={<Login />}/>
              <Route  path="/register" element={<Register />}/>
              <Route  path="/home" element={<Protected Component={Home} />}/>
              <Route  path="*" element={<Error />}/>
            </Routes>
        </Router> 
    </div>
  );
}

export default App;

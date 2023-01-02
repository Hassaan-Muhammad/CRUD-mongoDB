
import { useEffect, useState } from "react";

import { Routes, Route, Link, Navigate } from "react-router-dom";



import Home from "./components/home";
import Login from "./components/login";
import Signup from "./components/signup";



function App() {

  const [isLogin, setIsLogin] = useState(false);
  const [fullName, setFullName] = useState("");


 

  const logoutHandler = () => {

    

  }


  return (
    <div>

      {
        (isLogin) ?
          <ul className='navBar'>
            <li> <Link to={`/`}>Home</Link> </li>
            <li> {fullName} <button onClick={logoutHandler}>Logout</button> </li>
          </ul>
          :
          <ul className='navBar'>
            <li> <Link to={`/`}>Login</Link> </li>
            <li> <Link to={`/signup`}>Signup</Link> </li>
          </ul>
      }

      {(isLogin) ?

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
        :
        <Routes>
          <Route path="/" element={<Login set={setIsLogin} />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      }

    </div>
  );
}

export default App;
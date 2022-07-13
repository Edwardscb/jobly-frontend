import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import './App.css';
import Home from "./Home";
import useLocalStorage from "./hooks/useLocalStorage";
import JoblyApi from "./api";
import JoblyNavbar from "./Navbar";
import FrontEndRoutes from "./FrontEndRoutes";
import { useJwt } from "react-jwt";

const token_storage = "jobly-token";


function App() {
  const [loaded, setLoaded] = useState(false);
  const { decodedToken, isExpired } = useJwt(token);
  const [token, setToken] = useState(token_storage);

  useEffect(() => {
    if (token) {
      try {
        let { username } = decodedToken;
        JoblyApi.token = token;
      }

    }
    async function getToken() {
      setToken(useLocalStorage(token_storage));
    }

    setLoaded(false);
    getToken();
  })



  // const [infoLoaded, setInfoLoaded] = useState(false);
  // const [applicationIds, setApplicationIds] = useState(new Set([]))
  // const [currentUser, setCurrentUser] = useState(null);
  // const [token, setToken] = useLocalStorage(token_storage);

  // useEffect(function loadUser() {

  //   async function getCurrentUser() {
  //     if (token) {
  //       try {
  //         let { username } = jwt.decode(token);
  //         JoblyApi.token = token;
  //         let currentUser = await JoblyApi.getCurrentUser(username);
  //         setCurrentUser(currentUser);
  //         setApplicationIds(new Set(currentUser.applications));
  //       } catch (err) {
  //         console.error(err);
  //         setCurrentUser(null)
  //       }
  //     }
  //     setInfoLoaded(true)
  //   }

  //   setInfoLoaded(false);
  //   getCurrentUser()
  // }, [token])


  return (
    <div className="App">
      <BrowserRouter>
        <JoblyNavbar />
        <main>
          <FrontEndRoutes />
        </main>
      </BrowserRouter>

    </div>
  );
}

export default App;

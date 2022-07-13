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
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(token_storage);
  const { decodedToken, isExpired } = useJwt(token);

  useEffect(() => {
    async function getCurrentUser() {
    if (token) {
      try {
        let { username } = decodedToken.username;
        JoblyApi.token = token;
        let currentUser = await JoblyApi.getCurrentUser(username);
        setCCurrentUser(currentUser);
        setApplicationIds(new Set(currentUser.applications));
      } catch (err) {
        setCurrentUser(null);
      }
    }
    setInfoLoaded(true);
  }
  setInfoLoaded(false);
  getCurrentUser();
}, [token]);

function logout() {
  setCurrentUser(null);
  setToken(null);
}

async function signup(signupData) {
  try {
    let token = await JoblyApi.signup(signupData);
    setToken(token);
    return { success: true };
  } catch (err) {
    return { success: false, err}
  }
}

async function login(loginData) {
  try {
    let token = await JoblyApi.login(loginData);
    setToken(token);
    return { success: true };
  } catch (err) {
    return { success: false, err}
  }
}

function hasAppliedToJob(id) {
  return applicationIds.has(id);
}

function applyToJob(id) {
  if (hasAppliedToJob(id)) return;
  JoblyApi.applyToJob(currentUser.username, id);
  setApplicationIds(new Set([ ...applicationIds, id]));
}

if (!infoLoaded) return (<div>Please wait...</div>);

  return (
    <div className="App">
      <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser, hasAppliedToJob, applyToJob }}>
        <main>
          <FrontEndRoutes />
        </main>
        </UserContext.Provider>
      </BrowserRouter>

    </div>
  );
}

export default App;

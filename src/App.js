import React, { useState, useEffect } from "react";
import { BrowserRouter, useHistory } from "react-router-dom";
import './App.css';
import useLocalStorage from "./hooks/useLocalStorage";
import JoblyApi from "./api";
import JoblyNavbar from "./Navbar";
import FrontEndRoutes from "./FrontEndRoutes";
import UserContext from "./UserContext";
import jwt_decode from "jwt-decode";
import { createBrowserHistory } from 'history';

export const token_storage = "jobly-token";


function App() {
  const history = useHistory();
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(token_storage);
  
  console.debug(
    "App", "infoLoaded=", infoLoaded, "currentUser=", currentUser, "token=", token );
    
    useEffect(() => {
      console.debug("App useEffect loadUserInfo", "token=", token)
      
      async function getCurrentUser() {
        if (token) {
        const decodedToken = jwt_decode(token);
        try {
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getProfile(decodedToken.username);
          setCurrentUser(currentUser);
          setApplicationIds(new Set(currentUser.applications));
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err)
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
    console.debug("App signup signupData=", signupData);
    let token = await JoblyApi.signUp(signupData);
    console.debug("App signup token=", token)
    setToken(token);
    setCurrentUser(signupData.username);
    return { success: true };
  } catch (err) {
    console.error("signup failed", err)
    return { success: false, err}
  }
}

async function login(loginData) {
  try {
    let token = await JoblyApi.signIn(loginData);
    setToken(token);
    setCurrentUser(loginData.username);
    return { success: true };
  } catch (err) {
    console.error("login failed", err)
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
        <JoblyNavbar logout={logout} />
          <main>
          <FrontEndRoutes login={login} signup={signup} />
          </main>
        </UserContext.Provider>
      </BrowserRouter>
        </div>
  );
}

export default App;

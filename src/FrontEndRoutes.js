import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Profile from "./Profile";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobList from "./JobList";
import ProtectedRoute from "./ProtectedRoute";

const FrontEndRoutes = ({ login, signup }) => {
  

    return (
      <div className="pt-5" style={{height: "100vh"}}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <LoginForm login={login} />
        </Route>
        <Route exact path="/signup">
          <SignupForm signup={signup} />
        </Route>

        <ProtectedRoute exact path="/profile">
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute exact path="/jobs">
          <JobList />
        </ProtectedRoute>
        <ProtectedRoute exact path="/companies">
          <CompanyList />
        </ProtectedRoute>
        <ProtectedRoute exact path="/companies/:handle">
          <CompanyDetail />
        </ProtectedRoute>

        <Redirect to="/" />
      </Switch>
      </div>
    );
}

export default FrontEndRoutes;
import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import SignUpSignIn from "./SignUpSignIn";
import Profile from "./Profile";
import CompanyList from "./CompanyList";
import CompanyDetail from "./CompanyDetail";
import JobList from "./JobList";
import JobDetail from "./JobDetail"
import SignOut from "./SignOut";

const FrontEndRoutes = () => {
  

    return (
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/auth/token">
          <SignUpSignIn />
        </Route>
        <Route exact path="/auth/register">
          <SignUpSignIn />
        </Route>
        <Route exact path="/signout">
          <SignOut />
        </Route>
        <Route exact path="/users/:username">
          <Profile />
        </Route>
        <Route exact path="/jobs">
          <JobList />
        </Route>
        <Route exact path="/companies">
          <CompanyList />
        </Route>
        <Route exact path="/jobs/:id">
          <JobDetail />
        </Route>
        <Route exact path="/companies/:handle">
          <CompanyDetail />
        </Route>
      </Switch>
    );
}

export default FrontEndRoutes;
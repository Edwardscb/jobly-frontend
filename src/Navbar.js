import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, NavItem } from "reactstrap";

const JoblyNavbar = () => {

    return (
        
            <Navbar expand="md">
                <NavLink exact to="/" className="navbar-brand">
                    React Jobly
                </NavLink>
            
            <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink to="/jobs">Jobs</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/companies">Companies</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/auth/register">Sign up</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/auth/token">Sign in</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/users/:username">Profile</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink to="/signout">Sign out</NavLink>
                </NavItem>
            </Nav>
            </Navbar>
        

    );
}

export default JoblyNavbar;
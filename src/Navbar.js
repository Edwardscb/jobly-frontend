import React, { useContext } from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import UserContext from "./UserContext";

const JoblyNavbar = ({ logout }) => {
    const { currentUser } = useContext(UserContext);

    function loggedInNav() {
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
                    <NavLink to="/profile">Profile</NavLink>
                </NavItem>
                <NavItem>
                    <Link to="/" onClick={ logout }>Sign out</Link>
                </NavItem>
            </Nav>
            </Navbar>
    );
}

function loggedOutNav() {
    return (
        <Navbar expand="md">
                <NavLink exact to="/" className="navbar-brand">
                    React Jobly
                </NavLink>
        <ul className="ml-auto navbar-nav">
            <li className="nav-item mr-4">
                <NavLink to="/signup">Sign up</NavLink>
            </li>
            <li className="nav-item mr-4">      
                <NavLink to="/login">Sign in</NavLink>
            </li>
        </ul>
        </Navbar>    
    );
}

return (
    <nav>
        {currentUser ? loggedInNav() : loggedOutNav()}
    </nav>
);
}

export default JoblyNavbar;
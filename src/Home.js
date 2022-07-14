import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import UserContext from "./UserContext";

const Home = () => {
    const { currentUser } = useContext(UserContext);

    return (
        <div style={{color: "black", height: "100%"}} className="container text-center">
            <h1 className="mb-4 font-weight-bold">Jobly</h1>
            <p className="lead">All jobs in one place</p>
            {currentUser ? <h2> Welcome back {currentUser.firstName || currentUser.username}!</h2> : (<p><Link className="btn btn-primary font-weight-bold mr-3" to="/login">Login</Link><Link className="btn btn-primary font-weight-bold" to="/signup">Sign up</Link></p>)}
        </div>
    )

}

export default Home;
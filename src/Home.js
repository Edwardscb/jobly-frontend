import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import UserContext from "./UserContext";

const Home = () => {
    const { currentUser } = useContext(UserContext);

    return (
        <div style={{color: "black"}}>
            <h1>Jobly</h1>
            <p>All jobs in one place</p>
            {currentUser ? <h2> Welcome back {currentUser.firstName || currentUser.username}!</h2> : (<p><Link to="/login">Login</Link><Link to="/signup">Sign up</Link></p>)}
        </div>
    )

}

export default Home;
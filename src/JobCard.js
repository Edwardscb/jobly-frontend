import React, { useContext, useState, useEffect } from "react";
import UserContext from "./UserContext";


const JobCard = ({ id, title, salary, equity }) => {
    const { hasAppliedToJob, applyToJob } = useContext(UserContext);
    const [applied, setApplied] = useState();
    console.debug("JobCard", "hasAppliedToJob=", hasAppliedToJob, "applied=", applied)

    useEffect(function updateAppliedStatus() {
        setApplied(hasAppliedToJob(id));
    }, [id, hasAppliedToJob]);
    
    async function handleApply() {
        if (hasAppliedToJob(id)) return;
        console.log("applied id=", id)
        applyToJob(id);
        setApplied(true);
    }
    

    if (!equity) {
        equity = 0
    }

    return (
        <div style={{ margin: 2, maxWidth: 500, color: "black", border: "2px solid black"}}>
            <h1>Job Title: {title}</h1>
            <p>Job id: {id}</p>
            <p>Salary: {salary}</p>
            <p>Equity: {equity}</p>
            <button onClick={handleApply} disabled={applied}>{applied ? "Applied" : "Apply" }</button>
        </div>
    )

}

export default JobCard;

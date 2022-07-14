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
        <div className="card" style={{ maxWidth: 700}}>
        <div className="card-body" style={{ margin: 2, maxWidth: 700, color: "black", border: "2px solid black"}}>
            <h1 className="card-title">Job Title: {title}</h1>
            <p>Job id: {id}</p>
            <p>Salary: {salary}</p>
            <p>Equity: {equity}</p>
            <button className="btn btn-danger font-weight-bold text-uppercase float-right" onClick={handleApply} disabled={applied}>{applied ? "Applied" : "Apply" }</button>
        </div>
        </div>
    )

}

export default JobCard;

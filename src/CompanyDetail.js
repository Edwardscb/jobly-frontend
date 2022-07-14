import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "./api"
import JobCard from "./JobCard";

const CompanyDetail = () => {
    let { handle } = useParams();
    const [details, setDetails] = useState("");

    useEffect(() => {
        async function getDetails() {
            try {
            let res = await JoblyApi.getCompany(handle);
            setDetails(res[0])
            } catch (err) {
                console.error(err)
            }
        } getDetails(); 
    }, [handle])
    
    console.log(details.jobs)


    if (details) {
    return (
        <div className="col-md-8 offset-md-2" style={{color: "black"}}>
            <h1>Company Name: {details.name}</h1>
            <p><h3>Company Description: {details.description}</h3></p>
            <p>Company Size: {details.numEmployees} employees</p>
            <b>Current Job Openings:</b>

            {details.jobs.map(job => <JobCard key={job.id} id={job.id} title={job.title} salary={job.salary} equity={job.equity} />)}
    
        </div>
    )
    } else {
        return (
            <div>
                Please wait...
            </div>
        )
    }
}

export default CompanyDetail;
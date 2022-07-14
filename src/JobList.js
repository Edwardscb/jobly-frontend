import React, { useState, useEffect } from "react";
import JoblyApi from "./api";
import JobCard from "./JobCard";



const JobList = () => {
    const [jobs, setJobs] = useState(null);
    // const [mem, addToMem] = useMem();
    
    // added [data, setData] to try again with using multiple pieces of state in a single component and this time it is working
    // last time it didn't work for me and I can't remember what I did wrong... but now it is working and it makes a lot more 
    // sense as to why I can have multiple pieces of state in App().
    const [data, setData] = useState("");
    console.debug("JobList", "jobs=", jobs, "data=", data);
    
    
    
    // gets all companies upon initial render.
    useEffect(function getAll() {
        async function getAllJobs() {
        let job = await JoblyApi.getJobs();
        console.debug("JobList useEffect getAllJobs", "job=", job)
        setJobs(job);
    } getAllJobs();
    console.debug("JobList useEffect getAllJobs, execute getAllJobs")
}, [])
    
    // updates 'mem' when input occurs in the search field.  I changed this to setData and it works this time.
    function handleChange(evt) {
        // addToMem(evt.target.value)
        setData(evt.target.value);
    }

    // upon submit, prevents default and then calls getSpecificCompany using the current value of 'mem'. I changed this to setData and it works this time.
    function handleSubmit(evt) {
        evt.preventDefault()
        // getSpecificCompany(mem);
        getSpecificJob(data.toLowerCase())
    }

    // calls the backend and updates the list of companies to only the ones that matched the search terms
    async function getSpecificJob(searchTerm) {
        let res = await JoblyApi.getJobs(searchTerm);
        setJobs(res);
    }

    if (!jobs) return (<div>Please wait...</div>);

        return (
            <div className="jList col-md-8 offset-md-2" style={{minHeight: "100vh"}}>
                <div className="input-group" >
                <div className="jSearch form-outline offset-md-5" >
                    <form  className="form-group" onSubmit={handleSubmit}>
                        <div>
                        <label className="form-label" htmlFor="searchBar">Search: </label>
                        <input className="form-control" type="text" id="searchBar" name="searchBar" onChange={handleChange} value={data} ></input>
                        </div>
                        <div className="pull-right">
                        <span><button className="btn btn-secondary form-control" type="submit" onSubmit={handleSubmit}>Submit</button></span>
                        </div>
                    </form>
                </div>
            </div>
            <div className="offset-md-3">
                {jobs.map(j => (<JobCard key={j.id} id={j.id} title={j.title} salary={j.salary} equity={j.equity} />))}
                </div>
            </div>
        );
}

export default JobList;
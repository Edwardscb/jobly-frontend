import React, { useState, useEffect } from "react";
import JoblyApi from "./api";
import JobDetail from "./JobDetail";



const JobList = () => {

    const [jobs, setJobs] = useState(null);
    // const [mem, addToMem] = useMem();

    // added [data, setData] to try again with using multiple pieces of state in a single component and this time it is working
    // last time it didn't work for me and I can't remember what I did wrong... but now it is working and it makes a lot more 
    // sense as to why I can have multiple pieces of state in App().
    const [data, setData] = useState("");


   
    // gets all companies upon initial render.
    useEffect(function getAll() {
        async function getAllJobs() {
        let job = await JoblyApi.getJobs();
        setJobs(job);
    } getAllJobs();
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
        let res = await JoblyApi.getJob(searchTerm);
        setJobs(res);
    }

    if (jobs) {
        return (
            <div className="jList">
                <div className="jSearch">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="searchBar">Search: </label><br />
                        <input type="text" id="searchBar" name="searchBar" onChange={handleChange} value={data} ></input>
                        <button type="submit">Submit</button>
                    </form>
                </div>
                {jobs.map(j => (<JobCard key={j.id} id={j.id} title={j.title} salary={j.salary} equity={j.equity} />))}
            </div>
        );
    } else {
        return (
            <div className="jList">
                <p className="NotFound">Sorry, not found!</p>
            </div>
        )
    }

}

export default JobList;
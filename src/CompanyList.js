import React, { useState, useEffect } from "react";
import JoblyApi from "./api";
import CompanyCard from "./CompanyCard";

// removed this from the component because I have multiple pieces of state working in the component like I wanted it it too.
// I had been using it before since I couldn't get the other piece of state to work.
// import useMem from "./hooks/useMem";

const CompanyList = () => {
    const [companies, setCompanies] = useState(null);
    // const [mem, addToMem] = useMem();

    // added [data, setData] to try again with using multiple pieces of state in a single component and this time it is working
    // last time it didn't work for me and I can't remember what I did wrong... but now it is working and it makes a lot more 
    // sense as to why I can have multiple pieces of state in App().
    const [data, setData] = useState("");


   
    // gets all companies upon initial render.
    useEffect(function getAll() {
        async function getAllCompanies() {
        let company = await JoblyApi.getCompanies();
        console.log(company)
        setCompanies(company);
    } getAllCompanies();
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
        getSpecificCompany(data.toLowerCase())
    }

    // calls the backend and updates the list of companies to only the ones that matched the search terms
    async function getSpecificCompany(handle) {
        let res = await JoblyApi.getCompany(handle);
        setCompanies(res);
    }
    


    if (companies) {
    return (
        <div className="cList">
            <div className="cSearch">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="searchBar">Search: </label><br />
                    <input type="text" id="searchBar" name="searchBar" onChange={handleChange} value={data} ></input>
                    <button type="submit">Submit</button>
                </form>
            </div>
            {companies.map(c => (<CompanyCard key={c.handle} handle={c.handle} 
            name={c.name} description={c.description} logoUrl={c.logoUrl} />))}
        </div>
    );
    } else {
        return (
            <div className="cList">
                <p className="NotFound">Sorry, no results!</p>
            </div>
        )
    }
}

export default CompanyList;
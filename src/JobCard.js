import React from "react";

const JobCard = ({ id, title, salary, equity }) => {

    if (!equity) {
        equity = 0
    }
    console.log(title, salary)
    return (
        <div style={{ margin: 2, maxWidth: 500, color: "black", border: "2px solid black"}}>
            <h1>Job Title: {title}</h1>
            <p>Job id: {id}</p>
            <p>Salary: {salary}</p>
            <p>Equity: {equity}</p>
            <button>Apply</button>
        </div>
    )

}

export default JobCard;

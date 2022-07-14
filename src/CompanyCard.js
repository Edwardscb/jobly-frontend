import React from "react";
import { Link } from 'react-router-dom';

const CompanyCard = ({ handle, name, description, logoUrl}) => {
    let source = logoUrl ? <img style={{ maxWidth: 100 }} src='https://w7.pngwing.com/pngs/42/185/png-transparent-fake-news-bank-account-money-balance-others-text-trademark-logo.png' /> : null;

    return (
        <Link className="CompanyCard card" to={`/companies/${handle}`}>
        <div className="card-body" style={{color: "black", border: "2px solid black", margin: 10, maxWidth: 500}} >
            
            {source}
            <p><h3>
                {name}
            </h3></p>
            <p><h6>
                {description}
            </h6></p>
        </div>
        </Link>
    )

}

export default CompanyCard;
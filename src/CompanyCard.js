import React from "react";
import { Link } from 'react-router-dom';

const CompanyCard = ({ handle, name, description, logoUrl}) => {
    let source = logoUrl ? <img style={{ maxWidth: 100 }} src='https://dynamic.brandcrowd.com/asset/logo/741c5045-e3c8-4af5-82c0-e989d58c44e8/logo-search-grid-1x?v=637860918576300000' /> : null;

    return (

        <Link className="CompanyCard card" style={{ maxWidth: 700 }} to={`/companies/${handle}`}>
        <div className="card-body" style={{color: "black", border: "2px solid black", margin: 10, maxWidth: 700}} >
            
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
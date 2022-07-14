import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function SignupForm({ signup }) {
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
    });
    const [formErrors, setFormErrors] = useState([]);

    async function handleSubmit(evt) {
        console.debug("SignupForm handleSubmit evt=", evt, "formData=", formData);
        evt.preventDefault();
        let result = await signup(formData);
        if (result.success) {
            history.push("/companies");
        } else {
            console.debug("SignupForm handleSubmit error", result)
            setFormErrors(result.errors);
        }
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(fData => ({ ...fData, [name]: value }));
    }

    return (
        <div className="SignupForm" style={{height: "100vh"}}>
        <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
            <h2 className="mb-3">Sign up</h2>
            <div className="card">
                <div className="card-body">
            <form style={{color: "black" }}onSubmit={handleSubmit}>
                <div className="form-group">
                <label htmlFor="username">Username: </label>
                <input name="username" id="username"  className="form-control" value={formData.username} onChange={handleChange}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: </label>
                    <input type="password" name="password" id="password" className="form-control" value={formData.password} onChange={handleChange}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="firstName">First name: </label>
                    <input name="firstName" id="firstName" className="form-control" value={formData.firstName} onChange={handleChange}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last name: </label>
                    <input name="lastName" id="lastName" className="form-control" value={formData.lastName} onChange={handleChange}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="email">E-mail: </label>
                    <input name="email" id="email" className="form-control" value={formData.email} onChange={handleChange}></input>
                </div>
                {formErrors.length ? <div>{formErrors}</div> : null}
                <button type="submit" className="btn btn-primary float-right" onSubmit={handleSubmit}>Submit</button>
            </form>
            </div>
            </div>
        </div>
        </div>
    );
}

export default SignupForm;
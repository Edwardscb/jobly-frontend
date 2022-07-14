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
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                <label htmlFor="username">Username: </label>
                <input name="username" id="username" value={formData.username} onChange={handleChange}></input>
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input name="password" id="password" value={formData.password} onChange={handleChange}></input>
                </div>
                <div>
                    <label htmlFor="firstName">First name: </label>
                    <input name="firstName" id="firstName" value={formData.firstName} onChange={handleChange}></input>
                </div>
                <div>
                    <label htmlFor="lastName">Last name: </label>
                    <input name="lastName" id="lastName" value={formData.lastName} onChange={handleChange}></input>
                </div>
                <div>
                    <label htmlFor="email">E-mail: </label>
                    <input name="email" id="email" value={formData.email} onChange={handleChange}></input>
                </div>
                {formErrors.length ? <div>{formErrors}</div> : null}
                <button type="submit" onSubmit={handleSubmit}>Submit</button>
            </form>
        </div>
    );
}

export default SignupForm;
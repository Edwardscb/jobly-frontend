import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function LoginForm({ login }) {
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [formErrors, setFormErrors] = useState([]);

    async function handleSubmit(evt) {
        evt.preventDefault();
        let result = await login(formData);
        if (result.success) {
            history.push("/companies");
        } else {
            setFormErrors(result.errors);
        }
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(fData => ({ ...fData, [name]: value }));
    }

    return (
        <div>
            <form onSubmit={handleSubmit} >
                <div>
                <label htmlFor="username">Username: </label>
                    <input name="username" id="username" value={formData.username} onChange={handleChange} required></input>
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input name="password" id="password" value={formData.password} onChange={handleChange} required></input>
                </div>
                {formErrors.length ? <div>{formErrors}</div> : null}
                <button onSubmit={handleSubmit}>Submit</button>
            </form>
        </div>
    );
}

export default LoginForm;
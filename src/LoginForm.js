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
            console.debug("form errors=", formErrors)
            setFormErrors(result.errors);
        }
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(fData => ({ ...fData, [name]: value }));
    }

    return (
        <div className="LoginForm">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <h3 className="mb-3">Log in</h3>

                <div className="card">
                    <div className="card-body">
                        <form style={{color: "black"}} onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Username</label>
                                <input className="form-control" name="username" id="username" value={formData.username} onChange={handleChange} autoComplete="username" required></input>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" name="password" id="password" value={formData.password} onChange={handleChange} autoComplete="current-password" required></input>
                            </div>
                            {formErrors.length ? <div>{formErrors}</div> : null}
                            <button className="btn btn-primary float-right" onSubmit={handleSubmit}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
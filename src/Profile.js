import React, { useState, useContext } from "react";
import JoblyApi from "./api";
import UserContext from "./UserContext";



const Profile = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        username: currentUser.username,
        password: "",
    });
    const [formErrors, setFormErrors] = useState([])
    const [saveConfirmed, setSaveConfirmed] = useState(false);

    console.debug("Profile", "currentUser=", currentUser, "formData=", formData, "formErrors=", formErrors, "saveConfirmed=", saveConfirmed);

    async function handleSubmit(evt) {
        evt.preventDefault();

        let profileData = {
            firstName: formData.firstName, 
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password
        };

        let username = formData.username;
        let updatedUser;

        try {
            updatedUser = await JoblyApi.editProfile(username, profileData);
        } catch (err) {
            setFormErrors(err);
            return;
        }

        setFormData(fData => ({...fData, password: "" }));
        setFormErrors([]);
        setSaveConfirmed(true);

        setCurrentUser(updatedUser);
    }

    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(fData => ({ ...fData, [name]: value}));
        setFormErrors([])
    }

    return (
        <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4" style={{height: "100vh"}}>
        <h3>Profile</h3>
        <div className="card" style={{color: "black"}}>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label>Username</label>
                <p style={{fontWeight: "bold", fontSize: 24}}className="form-control-plaintext">{formData.username}</p>
              </div>
              <div className="form-group">
                <label>First Name</label>
                <input
                    name="firstName"
                    className="form-control"
                    value={formData.firstName}
                    onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                    name="lastName"
                    className="form-control"
                    value={formData.lastName}
                    onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label style={{color: "black"}}>Confirm password to make changes:</label>
                <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                />
              </div>

              {formErrors.length
                  ? <div>{formErrors}</div>
                  : null}

              {saveConfirmed
                  ?
                  <div>{["Updated successfully."]}</div>
                  : null}

              <button
                  className="btn btn-primary btn-block mt-4"
                  onClick={handleSubmit}
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    )
}

export default Profile;
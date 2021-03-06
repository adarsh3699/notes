import React, { useState } from 'react';
import { apiCall } from "../utils";
import Loader from "../components/Loader";

import "../css/login.css";

document.title = "Bhemu Notes | Create Your Account";

function CreateAcc() {
    const [msg, setMsg] = useState("");
    const [isApiLoading, setIsApiLoading] = useState(false);

    async function handleFormSubmit(e) {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confPassword = e.target.confPassword.value;

        if (email !== "" && password !== "" && confPassword !== "") {
            if (password === confPassword) {
                setIsApiLoading(true);

                const apiResp = await apiCall("auth/signUp", "post", { email, password });
                if (apiResp.statusCode === 200) {
                    setIsApiLoading(false);
                    setMsg(apiResp.msg)
                    document.location.href = "/";
                } else {
                    setIsApiLoading(false);
                    setMsg(apiResp.msg)
                }
            } else {
                setMsg("Passwords didn't match. Try again.")
            }
        } else {
            setMsg("Please enter all data.")
        }
    }

    return (
        <div id="background">
            <div id="wrapper">
                <div id='Title'>Create Your Account</div>

                <form id="form" onSubmit={handleFormSubmit}>
                    <input type="email" name='email' placeholder="Email" id="newUserName" />
                    <br />
                    <input type="Password" name='password' placeholder="Password (8 digit)" id="newPassword" pattern="().{8,}" />
                    <br />
                    <input type="Password" name='confPassword' placeholder="Confirm Password (8 digit)" id="confirmPass" pattern="().{8,}" />
                    <br />
                    <button id="signup" className={isApiLoading ? "isSignup" : ""} >Sign Up</button>
                    <div id="updateMsg" className="red" style={isApiLoading ? { marginBottom: "0px" } : {}}> {msg} </div>

                </form>

                <Loader isLoading={isApiLoading} />
                <hr />

                <div id='alreadyAcc' style={isApiLoading ? null : { margin: "25px 0px 5px 0px" }} >
                    <a href="/" >Already have an Account</a>
                </div>
            </div>
        </div>
    )
}

export default CreateAcc;
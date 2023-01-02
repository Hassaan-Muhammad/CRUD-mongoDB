import { useState } from "react";

import { Button, TextField } from '@mui/material';

const baseURL = 'http://localhost:3000'


function Login() {
    const [result, setResult] = useState("");


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const loginHandler = async (e) => {
        e.preventDefault();

        try {
            let response = await axios.use(`${baseURL}/login`, {
                email: email,
                password: password
            }, {
                withCredentials: true
            })
            console.log("login succesfull")
            setResult("login succesfull")

        } catch (e) {
            console.log("e:", e)
        }


    }



    return (
        <>
            <h4>This is Login page</h4>

            <form onSubmit={loginHandler} className="loginForm">


                <TextField
                    className="TextField"
                    id="email"
                    label="Email"
                    variant="outlined"
                    type="email"
                    name="username"
                    autoComplete="username"
                    placeholder="email"
                    onChange={(e) => { setEmail(e.target.value) }}
                />


                <br />

                <TextField
                    className="TextField"
                    id="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    name="current-password"
                    autoComplete="current-password"
                    placeholder="password"
                    onChange={(e) => { setPassword(e.target.value) }}
                />

                <br />
                <Button variant="outlined" type="submit">Login</Button>

            </form>

            <p>{result}</p>

        </>
    )
}

export default Login;
import React, { useState } from 'react';
import './login.scss';
import axios from "axios";
import md5 from "md5";

const LogIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const hash = md5(password);

        const data = JSON.stringify({
            login: username,
            password: hash,
        });

        const res = await axios({
            method: "post",
            url: "https://api.betaseries.com/members/auth",
            headers: {
                "Content-Type": "application/json",
                "X-BetaSeries-Key": process.env.REACT_APP_API_KEY,
                "X-BetaSeries-Version": "3.0",
            },
            data: data,
        })
        if (res.status === 200) {
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user_id", res.data.user.id);
            window.location.href = "/";
        };
    };

    return (
        <>
            <form className='form-login'>
                <input
                    className='input-login'
                    type="text"
                    name="username"
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
                <input
                    className='input-login'
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <button
                    className='button-login' 
                    type="submit" 
                    onClick={(e) => handleSubmit(e)
                }>Login</button>
            </form>
        </>
    );
};

export default LogIn;
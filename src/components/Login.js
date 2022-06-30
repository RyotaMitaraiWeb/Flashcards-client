import React from 'react';
export default function LoginBtn() {
    return (
        <button onClick={login}>Login</button>
    )
}

async function login() {
    const login = await fetch('http://localhost:5500/login', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Allow-Control-Access-Policy': true,
            "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
            username: 'ryota',
            password: '123456',
        }),
    });
    const res = await login.json();
    console.log(res);
}
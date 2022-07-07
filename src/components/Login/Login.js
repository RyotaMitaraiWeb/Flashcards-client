import React from 'react';
import Container from '../Container/Container';
export default function Login() {
    return (
        <Container>
            <h1>Влез в профил</h1>
            <form action="">
                <div className="group">
                    <label htmlFor="username">Потребтелско име</label>
                    <input type="text" id="username" name="username" placeholder="Потребителско име" />
                </div>
                {/* <input type="text" name="email" placeholder="Имейл" /> */}
                <div className="group">
                    <label htmlFor="password">Парола</label>
                    <input type="text" id="password" name="password" placeholder="Парола" />
                </div>
            </form>
        </Container>
    )
}

// async function login() {
//     const login = await fetch('http://localhost:5500/login', {
//         method: 'POST',
//         mode: 'cors',
//         credentials: 'include',
//         headers: {
//             'Content-Type': 'application/json',
//             'Allow-Control-Access-Policy': true,
//             "Access-Control-Allow-Credentials": true,
//         },
//         body: JSON.stringify({
//             username: 'ryota',
//             password: '123456',
//         }),
//     });
//     const res = await login.json();
//     console.log(res);
// }
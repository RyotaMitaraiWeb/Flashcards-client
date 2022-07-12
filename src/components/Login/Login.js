import React, { useState } from 'react';
import Container from '../Container/Container';
import './Login.scss';
import { Link } from 'react-router-dom';
import Icon from '../Icon/Icon';
import { useSelector } from 'react-redux/es/exports';
import Button from '../Button/Button';

export default function Login() {
    const preferences = useSelector(state => state.preferences);
    const theme = preferences.theme + '-theme';
    const [error, updateError] = useState(false);
    return (
        <Container>
            <h1>Влез в профил</h1>
            <form id="login" className={theme}>
                <div className="group">
                    <label htmlFor="username">Потребителско име</label>
                    <input type="text" id="username" name="username" placeholder="Потребителско име" />
                </div>
                <div className="group">
                    <label htmlFor="password">Парола</label>
                    <input type="password" id="password" name="password" placeholder="Парола" />
                </div>
                <div className="group">
                    <p>Нямаш профил? <Link to="/register">Регистрирай се!</Link></p>
                </div>
                <Button><Icon icon="sign-in-alt"></Icon> Влез в профил</Button>
                <p className={"error" + (!error ? " hidden" : null)}>Грешно потребителско име или парола!</p>
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
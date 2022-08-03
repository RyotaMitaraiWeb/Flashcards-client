import React, { useState } from 'react';
import Container from '../../Container/Container';
import '../Auth.scss';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../Icon/Icon';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useCloseMenu } from '../../../hooks/useCloseMenu';
import Button from '../../Button/Button';
import authService from '../../../services/auth';
import { updateUser } from '../../../app/slices/user';
const { login } = authService;

export default function Login() {
    const preferences = useSelector(state => state.preferences);
    const theme = preferences.theme + '-theme'
    
    const [error, updateError] = useState(false);
    const [username, changeUsername] = useState('');
    const [password, changePassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    document.title = 'Влез в твоя профил';
    async function handleSubmit(event) {
        event.preventDefault();
        const body = { username, password };
        const { res, data } = await login(body);
        if (res.status === 200) {
            dispatch(updateUser(data));
            navigate('/', { replace: true });
        } else {
            updateError(true);
        }
    }

    function handleUsernameChange(event) {
        const username = event.target.value;
        changeUsername(username);
    }

    function handlePasswordChange(event) {
        const password = event.target.value;
        changePassword(password);
    }

    useCloseMenu();

    return (
        <Container>
            <h1>Влез в профил</h1>
            <form id="auth" className={`form ${theme}`} onSubmit={handleSubmit}>
                <div className="group">
                    <label htmlFor="username">Потребителско име</label>
                    <input type="text" id="username" name="username" value={username} onChange={handleUsernameChange} placeholder="Потребителско име" />
                </div>
                <div className="group">
                    <label htmlFor="password">Парола</label>
                    <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} placeholder="Парола" />
                </div>
                <div className="group">
                    <p>Нямаш профил? <Link to="/register">Регистрирай се!</Link></p>
                </div>
                <Button disabled={false}><Icon icon="sign-in-alt"></Icon> Влез в профил</Button>
                <p className={"big error" + (!error ? " hidden" : "")}>Грешно потребителско име или парола!</p>
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
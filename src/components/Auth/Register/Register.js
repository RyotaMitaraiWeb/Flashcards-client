import React, { useReducer, useState } from 'react';
import Container from '../../Container/Container';
import '../Auth.scss';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Icon from '../../Icon/Icon';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import Button from '../../Button/Button';
import authService from '../../../services/auth';
import { updateUser } from '../../../app/slices/user';
import validationService from '../../../services/validation';
import { useCloseMenu } from '../../../hooks/useCloseMenu';
const { register } = authService;

const initialErrors = {
    usernameErrors: [],
    passwordErrors: '',
    emailErrors: '',
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'USERNAME':
            return { ...state, usernameErrors: action.usernameErrors };
        case 'PASSWORD':
            return { ...state, passwordErrors: action.passwordErrors };
        case 'EMAIL':
            return { ...state, emailErrors: action.emailErrors };
        default:
            return state;
    }
}

export default function Register(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const preferences = useSelector(state => state.preferences);
    const theme = preferences.theme + '-theme';

    const [validationErrors, updateErrors] = useReducer(reducer, initialErrors);
    const [validUsername, updateValidUsername] = useState(false);
    const [validPassword, updateValidPassword] = useState(false);
    const [validEmail, updateValidEmail] = useState(false);
    // const [usernameErrors, updateUsernameErrors] = useState([]);
    // const [emailErrors, updateEmailErrors] = useState(undefined);
    // const [passwordErrors, updatePasswordErrors] = useState(undefined);

    const [username, updateUsername] = useState('');
    const [password, updatePassword] = useState('');
    const [email, updateEmail] = useState('');

    useCloseMenu();
    
    async function handleSubmit(event) {
        event.preventDefault();
        const { res, data } = await register({
            username,
            email,
            password
        });

        if (res.status === 201) {
            dispatch(updateUser(data));
            navigate('/', { replace: true });
        }
    }

    function handleUsernameChange(event) {
        event.preventDefault();
        updateUsername(event.target.value);
    }

    async function validateUsername() {
        const errors = validationService.validateUsername(username);
        const existingUsername = await validationService.checkIfUserExists('username', username);
        if (existingUsername !== '') {
            errors.push(existingUsername);
        }

        const valid = errors.length === 0;

        updateErrors({ type: 'USERNAME', usernameErrors: errors });
        updateValidUsername(valid);
    }

    function handleEmailChange(event) {
        event.preventDefault();
        updateEmail(event.target.value);
    }

    async function validateEmail(event) {
        let error = validationService.validateEmail(event);
        if (error === '') {
            const existingEmail = await validationService.checkIfUserExists('email', event.target.value.trim());
            error = existingEmail;
        }

        updateErrors({ type: 'EMAIL', emailErrors: error });
        const valid = error === '';
        updateValidEmail(valid);

    }

    function handlePasswordChange(event) {
        event.preventDefault();
        updatePassword(event.target.value);
    }

    function validatePassword() {
        const error = validationService.validatePassword(password);
        updateErrors({ type: 'PASSWORD', passwordErrors: error });
        const valid = error === '';
        updateValidPassword(valid);
    }

    const disabled = !(validUsername && validPassword && validEmail);
    if (props.id !== '') {
        return <Navigate to="/" replace />
    } else {
        return (
            <Container>
                <h1>Регистрирай се</h1>
                <form id="auth" className={theme} onSubmit={handleSubmit}>
                    <div className="group">
                        <label htmlFor="username">Потребителско име</label>
                        <input type="text" id="username" name="username" value={username} onChange={handleUsernameChange} onBlur={validateUsername} placeholder="Потребителско име" required />
                        {/* {usernameErrors.map(error => <p className="error" key={error}>{error}</p>)} */}
                        {validationErrors.usernameErrors.map(error => <p className="error" key={error}>{error}</p>)}
                    </div>
                    <div className="group">
                        <label htmlFor="email">Имейл</label>
                        <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} onBlur={validateEmail} placeholder="Имейл" />
                        {validationErrors.emailErrors ? <p className="error">{validationErrors.emailErrors}</p> : null}
                    </div>
                    <div className="group">
                        <label htmlFor="password">Парола</label>
                        <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} onBlur={validatePassword} placeholder="Парола" />
                        {validationErrors.passwordErrors ? <p className="error">{validationErrors.passwordErrors}</p> : null}
                    </div>
                    <div className="group">
                        <p>Имаш профил? <Link to="/login">Влез сега!</Link></p>
                    </div>
                    <Button disabled={disabled}><Icon icon="sign-in-alt"></Icon> Регистрация</Button>
                </form>
            </Container>
        )
    }
}
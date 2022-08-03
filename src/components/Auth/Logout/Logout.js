import { useNavigate } from 'react-router-dom';
import authService from '../../../services/auth';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../app/slices/user';

export default function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        async function clearSession() {
            const res = await authService.logout();
            dispatch(logout());
            if (res.status === 204) {
                navigate('/', { replace: true });
            } else {
                navigate('/login', { replace: true });
            }
        }

        clearSession();
    }, [dispatch, navigate]);
}
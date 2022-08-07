import { useEffect } from "react";
import requestService from "../../services/requests";
import { useNavigate } from 'react-router-dom';
const { get } = requestService;

export default function Random() {
    const navigate = useNavigate();

    useEffect(() => {
        async function redirect() {
            const { res, data } = await get('/flashcard/random');
            if (res.status === 200) {
                navigate(`/flashcard/${data}`, { replace: true });            
            } else {
                navigate('/', { replace: true });            
            }
        }

        redirect();
    });
}
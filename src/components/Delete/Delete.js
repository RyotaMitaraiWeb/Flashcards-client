import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import requestService from '../../services/requests';
const { del } = requestService;

export default function Delete() {
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchData() {
            await del(`/flashcard/${id}/delete`);
            navigate('/', { replace: true });
        }

        fetchData();
    }, [id, navigate]);

}
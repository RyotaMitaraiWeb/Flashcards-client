import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import requestService from '../../services/requests';
const { del } = requestService;

export default function Delete() {
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchData() {
            const { res } = await del(`/flashcard/${id}/delete`);
            console.log(res);
            if (res.status === 202) {
                navigate('/', { replace: true });
            } else {
                navigate('/404', { replace: true });
            }
        }

        fetchData();
    }, [id, navigate]);

}
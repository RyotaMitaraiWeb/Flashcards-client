import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux/es/exports';
import './SearchResult.scss';
import requestService from '../../services/requests';
import Flashcard from '../Flashcard/Flashcard';
const { get } = requestService

export default function SearchResult() {
    document.title = 'Резултати от търсене';
    const [searchParams] = useSearchParams();
    const title = searchParams.get('title');
    const navigate = useNavigate();
    const [decks, setDecks] = useState([{}]);
    const preference = useSelector(state => state.preferences);
    const theme = preference.theme + '-theme';

    const entries = decks.map(d => {
        const shortDescription = d?.description?.slice(0, 201) || '';
        const threeFullStops = d?.description?.length > 200 ? '...' : '';
        return (
            <article key={d._id}>
                <Flashcard context="preview">
                    <h1><Link to={`/flashcard/${d?._id}`}>{d?.title}</Link></h1>
                    <div className="info">
                        <p className="author">От <strong>{d?.authorUsername}</strong></p>
                        <p className="description">{shortDescription + threeFullStops}</p>
                    </div>
                </Flashcard>
            </article>);
    })

    useEffect(() => {
        async function fetchData() {
            const { res, data } = await get(`/flashcard/search?title=${title}`);
            if (res.status === 200) {
                setDecks(data);
            } else {
                navigate('/', { replace: true });
            }
        }

        fetchData();
    }, [navigate, title]);

    return (
        <section id="results" className={theme}>
            {entries}
        </section>
    )
}
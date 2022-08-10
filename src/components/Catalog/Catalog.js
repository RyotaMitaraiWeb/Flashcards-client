import { useState } from 'react';
import requestService from '../../services/requests';
import Flashcard from '../Flashcard/Flashcard';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import './Catalog.scss';
import { useSelector } from 'react-redux/es/exports';
const { get } = requestService;

export default function Catalog() {
    const theme = useSelector(state => state.preferences.theme) + '-theme';
    const [data, setData] = useState([]);
    const decks = data.map(d => {
        const shortDescription = d?.description?.slice(0, 201) || '';
        const threeFullStops = d?.description?.length > 200 ? '...' : '';

        return (<article key={d?._id}>
            <Flashcard colorTheme="purple" context="preview">
                <h1><Link to={`/flashcard/${d?._id}`}>{d?.title}</Link></h1>
                <div className="info">
                    <p className="author">От <strong>{d?.authorUsername}</strong></p>
                    <p className="description">{shortDescription + threeFullStops}</p>
                </div>
            </Flashcard>
        </article>)
    });

    useEffect(() => {
        async function fetchData() {
            const { res, data } = await get('/flashcard/all');
            if (res.status === 200) {
                setData(data);
            }
        }

        fetchData();
    });

    return (
        <section className={`catalog ${theme}`}>
            {decks}
        </section>
    )
}
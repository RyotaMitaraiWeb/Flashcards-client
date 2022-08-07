import { useCloseMenu } from "../../hooks/useCloseMenu";
import { Link } from 'react-router-dom';
import './Home.scss';
import Icon from "../Icon/Icon";
import DeckPreview from "../Deck/DeckPreview";
import { useState, useEffect } from "react";
import requestService from '../../services/requests';
const { get } = requestService;

export default function Home(props) {
    useCloseMenu();

    const [decks, updateDecks] = useState([]);
    const previews = decks.map(deck => <DeckPreview key={deck._id} deck={deck} />);

    document.title = 'Начало';

    useEffect(() => {
        async function fetchData() {
            const { res, data } = await get('/flashcard/saved');
            if (res.ok) {
                updateDecks(data);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <h1>Моите тестета</h1>
            <section id="home" className="purple-theme light-theme">
                <div className="catalog-link">
                    <h2>Всички тестета</h2>
                    <Link to="/flashcard/all" className="button purple"><Icon icon="newspaper" /> Виж всички тестета</Link>
                </div>
                {props.id === ''
                    ? 
                    <div className="guest">
                        <h2>Не си регистриран!</h2>
                        <p><Link to="/register">Регистрирай се</Link> или <Link to="/login">влез в твоя профил</Link>, за да може да създаваш и запазваш тестета!</p>
                    </div>
                    :
                    <div className="decks">
                        <h2>Филтрирай моите тестета по заглавие</h2>
                        <input type="text" maxLength={150} />
                        {previews}
                    </div>
                }
                <div className="random-link">
                    <h2>Случайно тесте</h2>
                    <Link to="/" className="button purple"><Icon icon="random" /> Случайно тесте</Link>
                </div>
            </section>
        </>
    );
}
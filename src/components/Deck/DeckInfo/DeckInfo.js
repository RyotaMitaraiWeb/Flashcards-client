import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDateFormatter } from "../../../hooks/useDateFormatter";
import { useShuffler } from "../../../hooks/useShuffler";
import requestService from '../../../services/requests';
import Icon from "../../Icon/Icon";
import Session from "../../Session/Session";
import './DeckInfo.scss';
const { get, post } = requestService;

export default function DeckInfo() {
    const user = useSelector(state => state.user.id);
    const preference = useSelector(state => state.preferences);

    const colorTheme = preference.colorTheme;
    const theme = preference.theme + '-theme';

    const { id } = useParams();
    const navigate = useNavigate();
    const [bookmarked, setBookmark] = useState(false);

    const [toggle, setToggle] = useState(false);

    const [next, setNext] = useState(false);
    const [deck, setDeck] = useState({
        deck: {
            _id: '',
            title: '',
            description: '',
            author: '',
            authorUsername: '',
            createdAt: '',
            updatedAt: '',
        },
        flashcards: [
            {
                front: '',
                back: '',
                _id: '',
            }
        ]
    });

    function updateNext() {
        setNext(true);
    }

    const list = deck.flashcards.map(d =>
        <div key={d._id}>
            <div className="card">
                <div className="side">{d.front}</div>
                <div className="side">{d.back}</div>
            </div>
            <hr />
        </div>);

    const createDate = useDateFormatter(deck.deck.createdAt);
    const updateDate = useDateFormatter(deck.deck.updatedAt);

    const [checked, setCheck] = useState(false);
    const randomizedDeck = useShuffler(deck.flashcards, checked);

    function check() {
        setCheck(state => !state);
    }

    function toggleList() {
        setToggle(state => !state);
    }

    function bookmarkDeck() {
        async function bookmark() {
            const { res } = await post(`/flashcard/${id}/bookmark`);
            if (res.status === 201) {
                setBookmark(true);
            } else {
                setBookmark(false);
            }

            console.log(res.status);
        }

        bookmark();
    }

    useEffect(() => {
        async function fetchData() {
            const { res, data } = await get(`/flashcard/${id}`);
            if (res.status === 200) {
                setDeck(data);
                document.title = data.deck.title;
            } else {
                navigate('/page-not-found', { replace: true });
            }

            const result = await get(`/flashcard/${id}/hasBookmarked`);
            if (result.res.status !== 200) {
                setBookmark(false);
            } else {
                setBookmark(true);
            }
        }

        fetchData();

        return function () {
            setToggle(false);
        }
    }, [id, navigate, deck.title]);

    if (next) {
        if (!checked) {
            return <Session flashcards={deck.flashcards} />
        } else {
            return <Session flashcards={randomizedDeck} />
        }
    }

    return (
        <>
            <section className={`deck-info ${theme}`}>
                <div className="info">
                    <h1>{deck.deck.title}</h1>
                    <p className="author">Създадено от <strong>{deck.deck.authorUsername}</strong> на {createDate}. Последно редактирано на {updateDate}.</p>
                    <p className="description">{deck.deck.description}</p>
                </div>
                <div className="actions-session">
                    <h2>Действия</h2>
                    {deck.deck.author === user
                        ?
                        <>
                            <Link to={`/flashcard/${deck.deck._id}/edit`} className={`${colorTheme} button`}><Icon icon="pencil-alt" /> Редактирай</Link>
                            <Link to={`/flashcard/${deck.deck._id}/delete`} className="delete button"><Icon icon="trash" /> Изтрий</Link>
                        </>
                        : (
                            user !== ''
                                ? <div className="group save">
                                    <button onClick={bookmarkDeck} className={"bookmark" + (bookmarked ? " bookmarked" : "")} id="bookmark"><Icon icon="bookmark" /></button>
                                    <label htmlFor="bookmark">Запази тесте</label>
                                </div>
                                : null
                        )
                    }

                    <div className="group">
                        <input type="checkbox" id="shuffle" onChange={check} checked={checked} />
                        <label htmlFor="shuffle"><span className={"checkmark" + (checked ? " checked" : "")}><Icon icon="check" /></span> Разбъркай тестето</label>
                    </div>
                    <button className={`start ${colorTheme} button`} onClick={updateNext}>Започни учебна сесия</button>
                </div>
            </section>
            <section id="list" className={theme}>
                <div className={`${colorTheme} toggle`} tabIndex="0" onClick={toggleList}><span className="left">Списък на картите в това тесте ({deck.flashcards.length})</span> <span className="right"><Icon icon={toggle ? "minus" : "plus"} /></span></div>
                <div className={"cards" + (!toggle ? " hidden" : "")}>
                    {list}
                </div>
            </section>
        </>
    )
}
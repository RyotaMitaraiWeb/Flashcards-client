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
const { get } = requestService;

export default function DeckInfo() {
    const user = useSelector(state => state.user.id);
    const { id } = useParams();
    const navigate = useNavigate();

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

    useEffect(() => {
        async function fetchData() {
            const { res, data } = await get(`/flashcard/${id}`);
            if (res.status === 200) {
                setDeck(data);
            } else {
                navigate('/page-not-found', { replace: true });
            }
        }

        fetchData();

        return function() {
            setToggle(false);
        }
    }, [id, navigate, deck.title]);

    if (next) {
        if (!checked) {
            return <Session flashcards={deck.flashcards} />
        } else {
            console.log(randomizedDeck);
            return <Session flashcards={randomizedDeck} />
        }
    }

    return (
        <>
            <section className="deck-info">
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
                            <Link to={`/flashcard/${deck.deck._id}/edit`} className="purple button"><Icon icon="pencil-alt" /> Редактирай</Link>
                            <Link to={`/flashcard/${deck.deck._id}/delete`} className="delete button"><Icon icon="trash" /> Изтрий</Link>
                        </>
                        : null
                    }
                    <div className="group">
                        <input type="checkbox" id="shuffle" onChange={check} checked={checked} />
                        <label htmlFor="shuffle"><span className={"checkmark" + (checked ? " checked" : "")}><Icon icon="check" /></span> Разбъркай тестето</label>
                    </div>
                    <button className="start button purple" onClick={updateNext}>Започни учебна сесия</button>
                </div>
            </section>
            <section id="list">
                <div className="toggle purple" tabIndex="0" onClick={toggleList}><span className="left">Списък на картите в това тесте ({deck.flashcards.length})</span> <span className="right"><Icon icon="plus" /></span></div>
                <div className={"cards" + (!toggle ? " hidden" : "")}>
                    {list}
                </div>
            </section>
        </>
    )
}
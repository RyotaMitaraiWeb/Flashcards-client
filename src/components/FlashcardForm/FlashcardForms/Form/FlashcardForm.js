import { useRef } from "react";
import Flashcard from "../../../Flashcard/Flashcard";
import './FlashcardForm.scss';

export default function Form(props) {
    const side = props.side === 'front' ? 'Предна част' : 'Задна част';
    const form = useRef(null);

    function handleFocus(event) {
        event.stopPropagation();
        form.current.focus();
    }

    function handleChange(event) {
        props.handleChange(event);
    }

    return (
        <form className="flashcard-form">
            <h2>{side}</h2>
            <Flashcard colorTheme="purple" context="card" focus={handleFocus}>
                <div className="wrapper">
                    <textarea rows="5" ref={form} className={props.side} onChange={handleChange} value={props.content} maxLength="75"></textarea>
                </div>
            </Flashcard>
        </form>
    )
}
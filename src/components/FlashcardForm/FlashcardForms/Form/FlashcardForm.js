import Flashcard from "../../../Flashcard/Flashcard";
export default function Form(props) {
    const side = props.side === 'front' ? 'Предна част' : 'Задна част';

    return (
            <form className="flashcard-form">
                <h2>{side}</h2>
                <Flashcard colorTheme="purple" context="card">
                    <textarea className={props.side} cols="30" rows="10" onChange={props.handleChange} value={props.content}></textarea>
                </Flashcard>
            </form>
    )
}
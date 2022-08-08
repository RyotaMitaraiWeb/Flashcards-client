import './Body.scss';

export default function FlashcardBody(props) {
    return (
        <div className={`flashcard-body ${props.context} ${props.theme}`} onClick={props.focus}>
            {props.children}
        </div>
    )
}
import './Body.scss';

export default function FlashcardBody(props) {
    return (
        <div className={`flashcard-body ${props.context}`}>
            {props.children}
        </div>
    )
}
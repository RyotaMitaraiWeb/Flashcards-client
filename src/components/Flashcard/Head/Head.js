import './Head.scss';

export default function FlashcardHead(props) {
    return (
        <div className={`flashcard-head ${props.colorTheme} ${props.context}`} onClick={props.focus}></div>
    )
}
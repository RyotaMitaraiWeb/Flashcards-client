import './Head.scss';

export default function FlashcardHead(props) {
    return (
        <div className={`flashcard-head ${props.colorTheme} ${props.theme} ${props.context}`} onClick={props.focus}></div>
    )
}
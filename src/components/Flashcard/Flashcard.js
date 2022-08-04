import FlashcardHead from './Head/Head';
import FlashcardBody from './Body/Body';

export default function Flashcard(props) {
    return (
        <>
            <FlashcardHead colorTheme={props.colorTheme} context={props.context} focus={props.focus} />
            <FlashcardBody context={props.context} focus={props.focus}>
                {props.children}
            </FlashcardBody>
        </>
    )
}
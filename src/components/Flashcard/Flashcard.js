import FlashcardHead from './Head/Head';
import FlashcardBody from './Body/Body';
import { useSelector } from 'react-redux/es/exports';

export default function Flashcard(props) {
    const preference = useSelector(state => state.preferences);
    const theme = preference.theme + '-theme';
    const colorTheme = preference.colorTheme;
    return (
        <>
            <FlashcardHead colorTheme={colorTheme} context={props.context} focus={props.focus} theme={theme} />
            <FlashcardBody context={props.context} focus={props.focus} theme={theme}>
                {props.children}
            </FlashcardBody>
        </>
    )
}
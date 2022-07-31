import Flashcard from "../Flashcard/Flashcard";
import Icon from "../Icon/Icon";
import './DeckPreview.scss';
import { useSelector } from "react-redux/es/exports";
export default function DeckPreview(props) {
    const user = useSelector(state => state.user.id);

    return (
        <div className="deck-preview">
            <Flashcard context="preview" colorTheme="purple">
                <h3>{props.deck.title}</h3>
                <div className="info">
                    <div className="creation-info">
                        <div className="author">От <b>{props.deck.author}</b></div>
                        <div className="date">{props.deck.date}</div>
                    </div>
                    <div className="actions">
                        {user === props.deck.authorId
                            ? <button className="remove button"><Icon icon="times" /> Премахни</button>
                            : <>
                                <button className="purple button"><Icon icon="pencil-alt" /> Редактирай</button>
                                <button className="remove button"><Icon icon="trash-alt" /> Изтрии</button>
                            </>
                        }
                    </div>
                </div>
            </Flashcard>
        </div>
    )
}
import Flashcard from "../Flashcard/Flashcard";
import Icon from "../Icon/Icon";
import './DeckPreview.scss';
import { useSelector } from "react-redux/es/exports";
import { Link } from "react-router-dom";
import { useDateFormatter } from "../../hooks/useDateFormatter";

export default function DeckPreview(props) {
    const user = useSelector(state => state.user.id);
    const date = useDateFormatter(props.deck.createdAt);

    return (
        <div className="deck-preview">
            <Flashcard context="preview" colorTheme="purple">
                <h3><Link to={`/flashcard/${props.deck._id}`}>{props.deck.title}</Link></h3>
                <div className="info">
                    <div className="creation-info">
                        <div className="author">От <b>{props.deck.authorUsername}</b></div>
                        <div className="date">{date}</div>
                    </div>
                    <div className="actions">
                        {user === props.deck.authorId
                            ? <button className="remove button"><Icon icon="times" /> Премахни</button>
                            : <>
                                <Link to={`/flashcard/${props.deck._id}/edit`} className="purple button"><Icon icon="pencil-alt" /> Редактирай</Link>
                                <Link to={`/flashcard/${props.deck._id}/delete`} className="remove button"><Icon icon="trash-alt" /> Изтрии</Link>
                            </>
                        }
                    </div>
                </div>
            </Flashcard>
        </div>
    )
}
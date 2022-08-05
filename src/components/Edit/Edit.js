import BasicInfoForm from "../FlashcardForm/BasicInfoForm/BasicInfoForm";
import Container from '../Container/Container';
import { useEffect, useState } from "react";
import FlashcardForms from "../FlashcardForm/FlashcardForms/All/FlashcardForms";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { restartBasicInfo } from "../../app/slices/newFlashcard";
import requestService from "../../services/requests";
import { useNavigate, useParams } from "react-router-dom";
const { get } = requestService;

export default function Edit() {
    const { id } = useParams();
    const user = useSelector(state => state.user);
    const [next, updateNext] = useState(false);
    const [deck, setDeck] = useState({});
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function transitionToFlashcardForm(event) {
        event.preventDefault();
        updateNext(true);
    }

    useEffect(() => {
        async function fetchData() {
            const { res, data } = await get(`/flashcard/${id}`);
            if (res.status !== 200 || data.deck.author !== user.id) {
                navigate('/', { replace: true });
            } else {
                setDeck(data);
            }
        }

        fetchData();

        return function() {
            dispatch(restartBasicInfo());
        }
    }, [dispatch, id, navigate, user.id]);

    if (next) {
        return <FlashcardForms endpoint="edit" deck={deck} id={id} />
    }

    if (Object.entries(deck).length === 0) {
        return null;
    } else {
        document.title = `Редактирай ${deck.deck.title}`;
        return (
            <Container>
                <BasicInfoForm func={transitionToFlashcardForm} deck={deck} />
            </Container>
        )
    }
}
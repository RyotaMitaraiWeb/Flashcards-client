import BasicInfoForm from "../FlashcardForm/BasicInfoForm/BasicInfoForm";
import Container from '../Container/Container';
import { useEffect, useState } from "react";
import FlashcardForms from "../FlashcardForm/FlashcardForms/All/FlashcardForms";
import { useDispatch } from "react-redux/es/exports";
import { restartBasicInfo } from "../../app/slices/newFlashcard";

export default function Create() {
    const [next, updateNext] = useState(false);
    const dispatch = useDispatch();
    document.title = 'Създай ново тесте';

    function transitionToFlashcardForm(event) {
        event.preventDefault();
        updateNext(true);
    }

    useEffect(() => {
        return function() {
            dispatch(restartBasicInfo());
        }
    }, [dispatch]);

    if (next) {
        return <FlashcardForms endpoint="create" />
    }

    return (
        <Container>
            <BasicInfoForm func={transitionToFlashcardForm} endpoint="create" />
        </Container>
    )
}
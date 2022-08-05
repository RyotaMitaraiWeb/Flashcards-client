import Form from "../Form/FlashcardForm";
import Icon from "../../../Icon/Icon";
import { useState } from "react";
import { useSelector } from "react-redux/es/exports";
import requestService from '../../../../services/requests';
import { useNavigate } from "react-router-dom";
import Error from '../../../Feedback/Error';
import './FlashcardForms.scss';

const { post, put } = requestService;

export default function FlashcardForms(props) {
    const navigate = useNavigate();
    const flashcardsInfo = useSelector(state => state.flashcards);

    const [data, updateData] = useState(props?.deck?.flashcards || [{
        front: '',
        back: ''
    }]);

    const [counter, updateCounter] = useState(0);
    const front = data[counter].front;
    const back = data[counter].back;

    const frontError = front.trim().length <= 0 || front.trim().length > 75;
    const backError = back.trim().length <= 0 || back.trim().length > 75;

    function increment() {
        updateCounter(state => state + 1);
    }

    function decrement() {
        updateCounter(state => state - 1);
    }

    function addCard() {
        updateData([...data, {
            front: '',
            back: '',
        }]);

        updateCounter(data.length);
    }

    function deleteCard() {
        if (data.length) {
            const copy = [...data];
            copy.splice(counter, 1);
            if (copy.length === counter) {
                updateCounter(state => state - 1);
            }

            updateData(copy);
        }
    }

    function handleChange(event) {
        event.preventDefault();
        const copy = [...data];
        const content = event.target.value;
        const side = event.target.className;
        copy[counter][side] = content;
        updateData(copy);
    }

    async function saveDeck(event) {
        event.preventDefault();
        const invalidCardIndex = data.findIndex(c => {
            const invalidFront = c.front.length <= 0 || c.front.length > 75;
            const invalidBack = c.back.length <= 0 || c.back.length > 75;

            return invalidFront && invalidBack;
        });

        if (invalidCardIndex !== -1) {
            updateCounter(invalidCardIndex);
        } else {
            let result;
            if (props.endpoint === 'create') {
                result = await post(`/flashcard/create`, {
                    title: flashcardsInfo.title,
                    description: flashcardsInfo.description,
                    flashcards: data,
                });
            } else {
                console.log(data);
                result = await put(`/flashcard/${props.id}/edit`, {
                    title: flashcardsInfo.title,
                    description: flashcardsInfo.description,
                    flashcards: data,
                });
            }

            if (result.res.status === 201 || result.res.status === 202) {
                const id = result.data;
                navigate(`/flashcards/${id}`, { replace: true });
            }
        }
    }

    return (
        <>
            <p className="count">{counter + 1} / {data.length}</p>
            <div id="flashcard-form">
                <div className="group">
                    <button className={"previous" + (counter === 0 ? " invisible" : "")} onClick={decrement}><Icon icon="arrow-left" /></button>
                </div>
                <div className="forms">
                    <>
                        <div>
                            <Form side="front" content={data[counter].front} handleChange={handleChange}></Form>
                            <div className={frontError === false ? "invisible" : ""}>
                                <Error valid={false}>Съдържанието трябва да е между 1 и 75 символа!</Error>
                            </div>
                        </div>
                        <div>
                            <Form side="back" content={data[counter].back} handleChange={handleChange}></Form>
                            <div className={backError === false ? "invisible" : ""}>
                                <Error valid={false}>Съдържанието трябва да е между 1 и 75 символа!</Error>
                            </div>
                        </div>
                    </>
                </div>
                <div className="group">
                    <button className={"next" + (counter >= data.length - 1 ? " invisible" : "")} onClick={increment}><Icon icon="arrow-right" /></button>
                </div>
            </div>
            <p className="count">{counter + 1} / {data.length}</p>
            <div className="actions">
                <button className={"button add" + (data.length === 75 ? " hidden" : "")} onClick={addCard}><Icon icon="plus-circle" /> Добави нова карта</button>
                <button className={"button delete" + (data.length === 1 ? " hidden" : "")} onClick={deleteCard}><Icon icon="trash" /> Изтрий тази карта</button>
                <button className="button purple save" onClick={saveDeck}><Icon icon="check" /> Запази тесте</button>
            </div>
        </>
    );
}
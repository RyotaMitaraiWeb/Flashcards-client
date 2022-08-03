import { useState } from 'react';
import { useCloseMenu } from '../../../hooks/useCloseMenu';
import validationService from '../../../services/validation';
import { useDispatch } from "react-redux/es/exports";
import { updateBasicInfo } from '../../../app/slices/newFlashcard';
import Error from '../../Feedback/Error';
import Button from '../../Button/Button';

import './BasicInfoForm.scss';
import Icon from '../../Icon/Icon';
const { validateTitle, validateDescription } = validationService;

export default function BasicInfoForm(props) {
    useCloseMenu();
    const dispatch = useDispatch();

    const [title, updateTitle] = useState('');
    const [description, updateDescription] = useState('');

    const titleLength = title.trim().length;
    const descriptionLength = description.trim().length;

    const [validTitle, updateValidTitle] = useState(true);
    const [validDescription, updateValidDescription] = useState(true); 

    function changeTitle(event) {
        event.preventDefault();
        const title = event.target.value;
        updateTitle(title);
    }

    function changeDescription(event) {
        event.preventDefault();
        const description = event.target.value;
        updateDescription(description);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const titleIsValid = validateTitle(title);
        const descriptionIsValid = validateDescription(description);

        updateValidTitle(titleIsValid);
        updateValidDescription(descriptionIsValid);

        if (titleIsValid && descriptionIsValid) {
            const payload = {
                title: title,
                description: description,
            };

            dispatch(updateBasicInfo(payload));

            const func = props.func;
            func(event);
        }
    }
    return (
        <>
            <h1>Създай ново тесте</h1>
            <form id="basic-info-form" className="form" onSubmit={handleSubmit}>
                <div className="group">
                    <label htmlFor="title">Заглавие ({titleLength}/100)</label>
                    <input type="text" id="title" value={title} placeholder="Заглавие" maxLength="100" onChange={changeTitle} />
                    <Error valid={validTitle}>Заглавието трябва да е между 10 и 100 символа!</Error>
                </div>
                <div className="group">
                    <label htmlFor="description">Описание ({descriptionLength}/500)</label>
                    <textarea name="description" value={description} id="description" cols="30" rows="10" maxLength="500" onChange={changeDescription}></textarea>
                    <Error valid={validDescription}>Описанието трябва да е между 1 и 500 символа!</Error>
                </div>
                <div className="group">
                    <Button disabled={false}><Icon icon="arrow-alt-circle-right" /> Продължи</Button>
                </div>
            </form>
        </>
    )
}
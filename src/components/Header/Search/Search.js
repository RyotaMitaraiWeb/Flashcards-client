import './Search.scss';
import React from 'react';
import Icon from '../../Icon/Icon';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Search() {
    const [input, setInput] = useState('');
    const navigate = useNavigate();
    function searchDecks() {
        const search = input.trim();
        if (search !== '') {
            navigate(`/flashcard/search?title=${search}`, { replace: true });
        }
    }

    function handleChange(event) {
        event.preventDefault();
        setInput(event.target.value);
    }

    return (
        <>
            <label htmlFor="search">
                <input type="text" id="search" onChange={handleChange} value={input} placeholder="Търси по заглавие..." /><Icon icon="search" onClick={searchDecks} />
            </label>
        </>
    )
}
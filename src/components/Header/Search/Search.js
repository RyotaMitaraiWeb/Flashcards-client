import './Search.scss';
import React from 'react';
import Icon from '../../Icon/Icon';

export default function Search() {
    return (
        <>
            <label htmlFor="search">
                <Icon icon="search" /><input type="text" id="search" placeholder="Търси по заглавие..." />
            </label>
        </>
    )
}
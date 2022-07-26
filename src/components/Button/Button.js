import React from 'react';
import './Button.scss';
import { useSelector } from 'react-redux/es/exports';

export default function Button(props) {
    const preferences = useSelector(state => state.preferences);
    const color = preferences.color;
    const theme = preferences.theme + '-theme';
    return (
        <button disabled={props.disabled} className={`${color} ${theme} button`}>{props.children}</button>
    );
}
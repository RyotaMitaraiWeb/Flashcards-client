import React from "react";
import './Container.scss';
import { useSelector } from 'react-redux';
export default function Container(props) {
    const theme = useSelector(state => state.preferences.theme) + '-theme';
    return (
        <section id="container" className={theme}>
            {props.children}
        </section>
    );
}
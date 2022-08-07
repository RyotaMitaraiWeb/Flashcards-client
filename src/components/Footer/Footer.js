import './Footer.scss';
import React from 'react';
import Anchor from './Anchor/Anchor';
import { useSelector } from 'react-redux/es/exports';


export default function Footer() {
    const colorTheme = useSelector(state => state.preferences.colorTheme);
    return (
        <footer className={colorTheme}>
            <ul>
                <Anchor href="/about">За нас</Anchor>
                <Anchor href="/rules">Правила</Anchor>
                <Anchor href="/faq">Често задавани въпроси</Anchor>
            </ul>
            <p>Всички права запазени &copy; 2022</p>
        </footer>

    )
}
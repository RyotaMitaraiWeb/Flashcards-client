import './Footer.scss';
import React from 'react';
import Anchor from './Anchor/Anchor';

export default function Footer() {
    return (
        <footer>
            <ul>
                <Anchor href="/about">За нас</Anchor>
                <Anchor href="/rules">Правила</Anchor>
                <Anchor href="/faq">Често задавани въпроси</Anchor>
            </ul>
            <p>Всички права запазени &copy; 2022</p>
        </footer>

    )
}
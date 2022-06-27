import './Footer.scss';
import React from 'react';
import Anchor from '../Anchor/Anchor';

export default function Footer() {
    return (
        <footer>
            <ul>
                <Anchor href="/about" text="За нас" />
                <Anchor href="/rules" text="Правила" />
                <Anchor href="/faq" text="За нас" />
            </ul>
            <p>Всички права запазени &copy; 2022</p>
        </footer>

    )
}
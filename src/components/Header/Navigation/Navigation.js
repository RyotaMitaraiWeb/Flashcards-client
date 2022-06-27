import React from 'react';
import './Navigation.scss';
import Anchor from '../../Anchor/Anchor';

export default function Navigation() {
    return (
        <nav>
            <ul>
                <Anchor href="/" text="Моите тестета" />
                <Anchor href="/login" text="Влез в профил" />
                <Anchor href="/register" text="Регистрирай се" />
            </ul>
        </nav>
    )
}
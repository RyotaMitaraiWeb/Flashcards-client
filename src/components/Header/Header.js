import './Header.scss';
import React from 'react';
import Navigation from './Navigation/Navigation';

export default function Header() {
    return (
        <header>
            <input type="text" placeholder="Търси" />
            <Navigation />
        </header>
    )
}
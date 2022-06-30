import './Header.scss';
import React from 'react';
import Navigation from './Navigation/Navigation';
import Search from './Search/Search';

export default function Header() {
    return (
        <header>
            <Search />
            <Navigation />
        </header>
    )
}
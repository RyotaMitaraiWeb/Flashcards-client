import './Header.scss';
import React from 'react';
import Search from './Search/Search';
import Navigation from './Navigation/Navigation';

export default function Header() {
    return (
        <header>
            <Search />
            <Navigation />
        </header>
    )
}
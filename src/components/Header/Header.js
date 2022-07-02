import './Header.scss';
import React from 'react';
import NavGuest from './Navigation/NavGuest/Navigation';
import Search from './Search/Search';
import NavLogged from './Navigation/NavLogged/Navigation';

export default function Header() {
    return (
        <header>
            <Search />
            <NavLogged />
        </header>
    )
}
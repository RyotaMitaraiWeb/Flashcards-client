import './Header.scss';
import React from 'react';
import Search from './Search/Search';
import { useSelector } from 'react-redux/es/exports';
import Navigation from './Navigation/Navigation';


export default function Header() {
    let navMenu;
    const user = useSelector(state => state.user);
    return (
        <header>
            <Search />
            <Navigation />
        </header>
    )
}
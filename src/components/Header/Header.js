import './Header.scss';
import React from 'react';
import Search from './Search/Search';
import Navigation from './Navigation/Navigation';
import { useSelector } from 'react-redux/es/exports';


export default function Header() {
    const colorTheme = useSelector(state => state.preferences.colorTheme);
    return (
        <header className={colorTheme}>
            <Search />
            <Navigation />
        </header>
    )
}
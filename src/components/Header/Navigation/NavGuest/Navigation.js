import React, { useState } from 'react';
import '../Navigation.scss';
import NavItem from '../NavItem/NavItem';
import Icon from '../../../Icon/Icon';

export default function NavGuest() {
    const [isToggled, toggle] = useState(false);

    function toggleMenu() {
        toggle(isToggled => !isToggled);
    }

    return (
        <nav>
            <ul className="links">
                <NavItem href="/"><Icon icon="home" />Моите тестета</NavItem>
                <NavItem href="/login"><Icon icon="sign-in-alt" />Влез в профил</NavItem>
                <NavItem href="/register"><Icon icon="user-plus" />Регистрирай се</NavItem>
            </ul>
            <button onClick={toggleMenu}><Icon icon="bars" /></button>
        </nav>
    )
}
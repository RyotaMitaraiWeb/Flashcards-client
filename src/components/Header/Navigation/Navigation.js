import React from 'react';
import './Navigation.scss';
import NavItem from './NavItem/NavItem';
import Icon from '../../Icon/Icon';

export default function Navigation() {
    return (
        <nav>
            <ul>
                <NavItem href="/"><Icon icon="home" />Моите тестета</NavItem>
                <NavItem href="/login"><Icon icon="sign-in-alt" />Влез в профил</NavItem>
                <NavItem href="/register"><Icon icon="user-plus" />Регистрирай се</NavItem>
            </ul>
        </nav>
    )
}
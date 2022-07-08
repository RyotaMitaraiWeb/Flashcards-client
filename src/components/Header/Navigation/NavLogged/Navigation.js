import React from 'react';
import '../Navigation.scss';
import NavItem from '../NavItem/NavItem';
import Icon from '../../../Icon/Icon';

export default function NavLogged() {
    return (
        <>
            <NavItem href="/profile"><Icon icon="user-circle" /> Моят профил</NavItem>
            <NavItem href="/create"><Icon icon="plus" /> Създай ново тесте</NavItem>
            <NavItem href="/logout"><Icon icon="sign-out-alt" /> Излез от профил</NavItem>
        </>
    )
}
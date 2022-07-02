import React from 'react';
import '../Navigation.scss';
import NavItem from '../NavItem/NavItem';
import Icon from '../../../Icon/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal, isToggled } from '../../../../app/slices/mobileMenu';

export default function NavLogged() {

    const dispatch = useDispatch();
    const toggled = useSelector(isToggled);

    function toggleMenu() {
        dispatch(toggleModal(!toggled));
    }


    return (
        <nav>
            <button onClick={toggleMenu} aria-label="Отвори навигационно меню"><Icon icon="bars" /></button>
            <ul className={toggled ? "toggled" : null}>
                <NavItem href="/"><Icon icon="home" />Моите тестета</NavItem>
                <NavItem href="/profile"><Icon icon="user-circle" />Моят профил</NavItem>
                <NavItem href="/create"><Icon icon="plus" />Създай ново тесте</NavItem>
                <NavItem href="/logout"><Icon icon="sign-out-alt" />Излез от профил</NavItem>
                <button onClick={toggleMenu} className="close"><Icon icon="times" /> Затвори</button>
            </ul>
        </nav>
    )
}
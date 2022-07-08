import React from 'react';
import './Navigation.scss';
import NavItem from './NavItem/NavItem';
import Icon from '../../Icon/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '../../../app/slices/mobileMenu';
import NavLogged from './NavLogged/Navigation';
import NavGuest from './NavGuest/Navigation';

export default function Navigation() {

    const dispatch = useDispatch();
    const toggled = useSelector(state => state.modal.isToggled);
    const user = useSelector(state => state.user);

    function toggleMenu() {
        dispatch(toggleModal(!toggled));
    }

    return (
        <nav>
            <button>login</button>
            <button onClick={toggleMenu} aria-label="Отвори навигационно меню"><Icon icon="bars" /></button>
            <ul className={toggled ? "toggled" : null} onClick={toggleMenu}>
                <NavItem href="/"><Icon icon="home" /> Моите тестета</NavItem>
                { 
                    user.id !== '' 
                    ? <NavLogged />
                    : <NavGuest />
                }
                <button className="close"><Icon icon="times" /> Затвори</button>
            </ul>
        </nav>
    )
}
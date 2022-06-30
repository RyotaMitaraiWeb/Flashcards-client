import './NavItem.scss';
import React from 'react';
import { Link } from 'react-router-dom';

export default function NavItem(props) {
    return (
        <li class="nav-link"><Link to={props.href}>{props.children}</Link></li>
    );
}
import './Anchor.scss';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Anchor(props) {
    return (
        <li className="footer-link"><Link to={props.href}>{props.children}</Link></li>
    );
}
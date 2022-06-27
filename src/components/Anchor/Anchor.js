import './Anchor.scss';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Anchor(props) {
    return (
        <li><Link to={props.href}>{props.text}</Link></li>
    );
}
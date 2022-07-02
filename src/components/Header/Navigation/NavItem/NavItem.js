import './NavItem.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toggleModal } from '../../../../app/slices/mobileMenu';

export default function NavItem(props) {
    const dispatch = useDispatch();
    
    function closeModal() {
        dispatch(toggleModal(false));
    }

    return (
        <li className="nav-link" onClick={closeModal}><Link to={props.href}>{props.children}</Link></li>
    );
}
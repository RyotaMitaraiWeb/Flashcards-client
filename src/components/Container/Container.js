import React from "react";
import './Container.scss';

export default function Container(props) {
    return (
        <section id="container">
            {props.children}
        </section>
    );
}
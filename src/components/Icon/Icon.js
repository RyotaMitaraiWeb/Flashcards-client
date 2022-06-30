import './Icon.scss';
import React from "react";

export default function Icon(props) {
    return (
        <span className={"fa fa-" + props.icon} aria-hidden="true"></span>
    )
}
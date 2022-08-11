import { useState } from 'react';
import { useSelector } from 'react-redux';
import './QuestionMarkCircle.scss';

export default function QuestionMarkCircle(props) {
    const preference = useSelector(state => state.preferences);
    const colorTheme = preference.colorTheme;
    const theme = preference.theme + '-theme';

    const [toggled, setToggle] = useState(false)
    function toggle() {
        setToggle(state => !state);
    }

    return (
        <div className={`circle ${theme} ${colorTheme} ${toggled ? "toggled" : ""}`} tabIndex="0" onClick={toggle}>
            <span className={`content ${colorTheme}`}>{props.children}</span>
        </div>
    )
}
import './Radio.scss';

export default function Checkbox(props) {
    const checked = props.value === props.current;
    return (
        <div className="radio">
            <input type="radio" value={props.value} id={props.value} name={props.name} checked={checked} className={checked ? "checked" : ""} onChange={props.changeHandler} />
            <label htmlFor={props.value}>{props.label}</label>
        </div>
    )
}
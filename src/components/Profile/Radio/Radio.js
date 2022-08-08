import './Radio.scss';

export default function Checkbox(props) {
    // function change(event) {
    //     event.preventDefault();
    //     setCheck(event.target.value);
    //     // console.log(event.target.value);
    // }

    return (
        <div className="radio">
            <input type="radio" value={props.value} id={props.value} name={props.name} checked={props.value === props.current} className={props.value === props.current ? "checked" : ""} onChange={props.changeHandler} />
            <label htmlFor={props.value}>{props.label}</label>
        </div>
    )
}
import './Feedback.scss';
import Icon from '../Icon/Icon';

export default function Valid(props) {
    if (props.valid) {
        return <p className="valid"><Icon icon="check-circle" /> {props.children}</p>
    } else {
        return null;
    }
}
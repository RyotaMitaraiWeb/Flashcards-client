import './Feedback.scss';
import Icon from '../Icon/Icon';

export default function Error(props) {
    if (!props.valid && props.children) {
        return <p className="error"><Icon icon="exclamation-circle" /> {props.children}</p>
    } else {
        return null;
    }
}
import { useCloseMenu } from "../../hooks/useCloseMenu";
import './Home.scss';

export default function Home(props) {
    useCloseMenu();
    document.title = 'Начало';
    if (props.id === '') {
        return <h1>Hello, guest</h1>
    }
    return (
        <h1>Home</h1>
    );
}
import { Link } from 'react-router-dom';
import Container from '../Container/Container';
import './404.scss';

export default function NotFound() {
    return (
        <Container>
            <h1 className="not-found">Грешка 404 - страницата не съществува!</h1>
            <p className="not-found"><Link to="/" replace>Върни се в началото</Link></p>
        </Container>
    )
}
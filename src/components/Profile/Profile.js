import { useSelector, useDispatch } from "react-redux";
import { updatePreference } from "../../app/slices/preferences";
import requestService from '../../services/requests';
import Radio from './Radio/Radio';
import './Profile.scss';
import Container from "../Container/Container";
import { useCloseMenu } from "../../hooks/useCloseMenu";

const { put } = requestService;

export default function Profile() {
    useCloseMenu();
    const { colorTheme, theme, animation } = useSelector(state => state.preferences);
    const username = useSelector(state => state.user.username);

    const dispatch = useDispatch();

    function changePreference(event) {
        const value = event.target.value;
        const name = event.target.name;
        console.log(name, value);
        const copy = {
            colorTheme,
            theme,
            animation
        };

        copy[name] = value;

        async function savePreference() {
            const { res } = await put('/profile', copy);
            if (res.status === 202) {
                dispatch(updatePreference(copy));
            }
        }

        savePreference();
    };

    return (
        <Container>
            <section id="profile" className={theme + '-theme'}>
                <h1>Профил на {username}</h1>
                <form>
                    <h2>Цвят на приложението</h2>
                    <div className="color-theme">
                        <Radio label="Люлав" value="purple" name="colorTheme" current={colorTheme} changeHandler={changePreference} />
                        <Radio label="Син" value="blue" name="colorTheme" current={colorTheme} changeHandler={changePreference} />
                        <Radio label="Розов" value="pink" name="colorTheme" current={colorTheme} changeHandler={changePreference} />
                        <Radio label="Зелен" value="green" name="colorTheme" current={colorTheme} changeHandler={changePreference} />
                        <Radio label="Кафяв" value="brown" name="colorTheme" current={colorTheme} changeHandler={changePreference} />
                    </div>

                    <h2>Режим на приложението</h2>
                    <div className="theme">
                        <Radio label="Светъл" value="light" name="theme" current={theme} changeHandler={changePreference} />
                        <Radio label="Тъмен" value="dark" name="theme" current={theme} changeHandler={changePreference} />
                    </div>
                    <h2>Анимация</h2>
                    <div className="animation">
                        <Radio label="Вертикална" value="vertical" name="animation" current={animation} changeHandler={changePreference} />
                        <Radio label="Хоризонтална" value="horizontal" name="animation" current={animation} changeHandler={changePreference} />
                    </div>
                </form>
            </section>
        </Container>
    )
}
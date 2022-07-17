import React from 'react';
import { Routes, Route } from "react-router-dom";
import Login from './components/Login/Login';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useEffect } from 'react';
import requestService from './services/requests';
import { updateUser } from './app/slices/user';
import Logout from './components/Logout/Logout';

const Header = React.lazy(() => import('./components/Header/Header'));
const Footer = React.lazy(() => import('./components/Footer/Footer'));

function App() {
    const toggled = useSelector(state => state.modal.isToggled);
    const preferences = useSelector(state => state.preferences);
    const user = useSelector(state => state.user);
    const theme = preferences.theme + '-theme';
    const dispatch = useDispatch();
    document.title = 'Начало';

    useEffect(() => {
        async function fetchData() {
            const { res, data } = await requestService.get('/isLogged');
            if (res.ok) {
                dispatch(updateUser(data));
            }
        }

        fetchData();
    }, [dispatch]);
    return (
        <React.Suspense fallback={<h1>Loading</h1>}>
            <main className={(toggled ? "locked " : "") + "app " + theme}>
                <Header />
                <Routes>
                    <Route path="/" element={<h2>Home</h2>}></Route>
                    <Route path="/about" element={<h2>За нас</h2>}></Route>
                    <Route path="/rules" element={<h2>Правила</h2>}></Route>
                    <Route path="/faq" element={<h2>Често задавани въпроси</h2>}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/logout" element={<Logout />}></Route>
                </Routes>
                <Footer />

            </main>
        </React.Suspense>
    );
}

// async function register() {
//     const url = 'http://localhost:5500/register';
//     console.log('test')
//     const test = await fetch(url, {
//         method: 'POST',
//         mode: 'cors',
//         credentials: 'include',
//         headers: {
//             'Access-Control-Allow-Origin': true,
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             name: 'test',
//         })
//     });
// }
export default App;
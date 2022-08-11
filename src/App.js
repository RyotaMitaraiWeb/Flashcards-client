import React from 'react';
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useEffect } from 'react';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import requestService from './services/requests';
import { updateUser } from './app/slices/user';
import Logout from './components/Auth//Logout/Logout';
import Create from './components/Create/Create';
import LoggedInGuard from './RouteGuards/LoggedInGuard';
import GuestGuard from './RouteGuards/GuestGuard';
import Edit from './components/Edit/Edit';
import Delete from './components/Delete/Delete';
import DeckInfo from './components/Deck/DeckInfo/DeckInfo';
import Catalog from './components/Catalog/Catalog';
import Random from './components/Random/Random';
import Profile from './components/Profile/Profile';
import SearchResult from './components/SearchResult/SearchResult';
import { updatePreference } from './app/slices/preferences';

const Home = React.lazy(() => import('./components/Home/Home'));
const Header = React.lazy(() => import('./components/Header/Header'));
const Footer = React.lazy(() => import('./components/Footer/Footer'));

function App() {
    const toggled = useSelector(state => state.modal.isToggled);
    const preferences = useSelector(state => state.preferences);
    const user = useSelector(state => state.user);
    const theme = preferences.theme + '-theme';
    console.log(theme);
    const dispatch = useDispatch();
    useEffect(() => {
        async function fetchData() {
            const { res, data } = await requestService.get('/isLogged');
            if (res.ok) {
                dispatch(updateUser(data));
            }

            const result = await requestService.get('/profile');
            if (result.res.status === 200) {
                console.log(result.data);
                dispatch(updatePreference(result.data));
            }
        }

        fetchData();
    }, [dispatch]);
    return (
        <React.Suspense fallback={<h1>Loading</h1>}>
            <main className={(toggled ? "locked " : "") + "app " + theme}>
                <Header />
                <Routes>
                    <Route path="/" element={<Home id={user.id} />}></Route>
                    <Route path="/about" element={<h2>За нас</h2>}></Route>
                    <Route path="/rules" element={<h2>Правила</h2>}></Route>
                    <Route path="/faq" element={<h2>Често задавани въпроси</h2>}></Route>
                    <Route path="/profile" element={
                        <LoggedInGuard>
                            <Profile />
                        </LoggedInGuard>
                    }></Route>
                    <Route path="/login" element={
                        <GuestGuard>
                            <Login />
                        </GuestGuard>
                    }>
                    </Route>
                    <Route path="/register" element={
                        <GuestGuard>
                            <Register />
                        </GuestGuard>
                    }>
                    </Route>
                    <Route path="/logout" element={
                        <LoggedInGuard>
                            <Logout />
                        </LoggedInGuard>
                    }></Route>
                    <Route path="/create" element={
                        <LoggedInGuard>
                            <Create />
                        </LoggedInGuard>
                    }>
                    </Route>
                    <Route path="/flashcard/all" element={<Catalog />}></Route>
                    <Route path="/flashcard/random" element={<Random />}></Route>
                    <Route path="/flashcard/search" element={<SearchResult />}></Route>
                    <Route path="/flashcard/:id" element={<DeckInfo />}></Route>
                    <Route path="/flashcard/:id/edit" element={
                        <LoggedInGuard>
                            <Edit />
                        </LoggedInGuard>
                    }></Route>
                    <Route path="/flashcard/:id/delete" element={
                        <LoggedInGuard>
                            <Delete />
                        </LoggedInGuard>
                    }></Route>
                </Routes>
                <Footer />

            </main>
        </React.Suspense>
    );
}

export default App;
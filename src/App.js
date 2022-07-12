import React from 'react';
import { Routes, Route } from "react-router-dom";
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import { useSelector } from 'react-redux/es/exports';

// import LogoutBtn from './components/Logout';
// import TestComponent from './components/Test';

function App() {
    const toggled = useSelector(state => state.modal.isToggled);
    const preferences = useSelector(state => state.preferences);
    const theme = preferences.theme + '-theme';
    return (
        <main className={(toggled ? "locked " : "") + "app " + theme}>
            <Header />
            <Routes>
                <Route path="/" element={<h2>Home</h2>}></Route>
                <Route path="/about" element={<h2>За нас</h2>}></Route>
                <Route path="/rules" element={<h2>Правила</h2>}></Route>
                <Route path="/faq" element={<h2>Често задавани въпроси</h2>}></Route>
                <Route path="/login" element={<Login />}></Route>
            </Routes>
            <Footer />
        </main>
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
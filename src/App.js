import React from 'react';
import { Routes, Route } from "react-router-dom";
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<h2>Home</h2>}></Route>
                <Route path="/about" element={<h2>За нас</h2>}></Route>
                <Route path="/rules" element={<h2>Правила</h2>}></Route>
                <Route path="/faq" element={<h2>Често задавани въпроси</h2>}></Route>
            </Routes>
            <Header />
            <Footer />
        </>
    );
}

export default App;

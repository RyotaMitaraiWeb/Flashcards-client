import React from 'react';
import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <>
            <Routes>
                <Route path="/home"></Route>
                <Route path="/about"></Route>
            </Routes>
        </>
    );
}

export default App;

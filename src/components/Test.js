// import React from 'react';
// export default function TestComponent() {
//     return (
//         <button onClick={checkToken}>Get resources</button>
//     )
// }

// async function checkToken() {
//     const login = await fetch('http://localhost:5500/user', {
//         method: 'GET',
//         mode: 'cors',
//         credentials: 'include',
//         headers: {
//             'Content-Type': 'application/json',
//             'Allow-Control-Access-Policy': true,
//             "Access-Control-Allow-Credentials": true,
//         },
//     });
//     const res = await login.json();
//     console.log(res);
// }
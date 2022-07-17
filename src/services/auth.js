import requestService from './requests';
const { get, post } = requestService;

async function login(body) {
    const { res, data } = await post('/login', body);
    return { res, data };
}

async function logout() {
    const { res } = await get('/logout');
    console.log(res);
    return res;
}

const authService = {
    login,
    logout,
};

export default authService;
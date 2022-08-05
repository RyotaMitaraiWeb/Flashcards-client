import requestService from './requests';
const { get, post } = requestService;

async function login(body) {
    const { res, data } = await post('/login', body);
    return { res, data };
}

async function register(body) {
    const { res, data } = await post('/register', body);
    return { res, data };
}

async function logout() {
    const { res } = await get('/logout');
    return res;
}

const authService = {
    register,
    login,
    logout,
};

export default authService;
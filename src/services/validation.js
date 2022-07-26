import requestService from "./requests";
const { post } = requestService;

function validateUsername(username) {
    const errors = [];
    if (username.length === 0) {
        errors.push('Потребителското име е задължително');
    } else {
        const startPattern = /^[a-z]/i;
        const validSymbolsPattern = /[^0-9a-z]+/i;

        if (username.length > 15 || username.length < 5) {
            errors.push('Потребителското име трябва да е между 5 и 15 символа!');
        }

        if (!startPattern.test(username)) {
            errors.push('Потребителското име трябва да започва с английска буква!');
        }

        if (validSymbolsPattern.test(username)) {
            errors.push('Потребителското име може да се състои само от английски букви и цифри!');
        }
    }

    return errors;
}

function validatePassword(password) {
    const errors = [];
    if (password.length === 0) {
        return 'Паролата е задължителна';
    } else if (password.length < 6) {
        return 'Паролата трябва да е поне 6 символа';
    }
    
    return '';
}

function validateEmail(event) {
    const email = event.target.value.trim();
    if (email.length === 0) {
        return 'Имейлът е задължителен';
    } else if (!event.target.checkValidity()) {
        return 'Имейлът трябва да е във формат имейл@домейн';
    }

    return '';
}

async function checkIfUserExists(attribute, value) {
    const body = {};
    body[attribute] = value;

    const { data } = await post('/exists', body);
    console.log(data);
    return data.error;
}

const validationService = {
    validateUsername,
    validatePassword,
    validateEmail,
    checkIfUserExists,
};
export default validationService;
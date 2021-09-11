export const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export const validatePassword = (password) => {
    return password.length > 8;
}

export const validateName = (name) => {
    return /^[a-zA-Z ]+$/.test(name);
}

export const validateRegistrationPassword = (password1, password2) => {
    return validatePassword(password1) && validatePassword(password2) && password1 === password2;
}
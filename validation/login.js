const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateLoginInput(data) {
    let errors = {};

    data.usernameOrEmail = validText(data.usernameOrEmail) ? data.usernameOrEmail : '';
    data.password = validText(data.password) ? data.password : '';

    if (Validator.isEmpty(data.usernameOrEmail)) {
        errors.usernameOrEmail = 'Username or Email field is required';
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};
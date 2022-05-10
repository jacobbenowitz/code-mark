const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateLoginInput(data) {
    let errors = {};

    data.username = validText(data.username) ? data.username : '';
    data.email = validText(data.email) ? data.email : '';
    data.password = validText(data.password) ? data.password : '';

    if (Validator.isEmpty(data.username)) {
        if(Validator.isEmpty(data.email)){
            errors.all = 'Username or Email field is required';
        }else if (!Validator.isEmail(data.email)){
            errors.email = 'Email is Invalid'
        }
    }
    // else{
    //     if(!Validator.isEmpty(data.email) && !Validator.isEmail(data.email)){
    //         errors.email = 'Email is Invalid'
    //     }
    // }

    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};
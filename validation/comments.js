const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateCommentInput(data) {
    let errors = {};

    data.textbody = validText(data.textbody) ? data.textbody : '';

    if(Validator.isEmpty(data.textbody)){
        errors.textbody = 'Text Body field is required';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };
};
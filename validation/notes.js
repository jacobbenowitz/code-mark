const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateNoteInput(data) {
  let errors = {};

  data.codebody = validText(data.codebody) ? data.codebody : '';
  data.textdetails = validText(data.textdetails) ? data.textdetails: '';

  if (!Validator.isLength(data.codebody, { min: 5, max: 140 })) {
    errors.codebody = 'Tweet must be between 5 and 140 characters';
  }

  if (Validator.isEmpty(data.codebody)) {
    errors.codebody = 'Text field is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
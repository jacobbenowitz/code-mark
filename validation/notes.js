const Validator = require('validator');
const validText = require('./valid-text');

module.exports = function validateNoteInput(data) {
  let errors = {};

  data.codebody = validText(data.codebody) ? data.codebody : '';
  data.textdetails = validText(data.textdetails) ? data.textdetails : '';
  // we should ensure the title is valid text as well
  // data.title = validText(data.title) ? data.title: '';

  if (!Validator.isLength(data.codebody, { min: 5, max: 5000 })) {
    errors.codebody = 'Code Body must be between 5 and 5000 characters';
  }

  if (Validator.isEmpty(data.codebody)) {
    errors.codebody = 'Code Body field is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
import joi from 'joi'
export const userSchema = joi.object({
    userName: joi.string().min(5).max(30).required().messages({
      'string.empty': 'The fullname to e provided cannot be empty',
      'string.min.base': 'The minimum characters for fullnames should be greater than 5'
    }),
    phoneNumber: joi.string().pattern(new RegExp('^[0-9]{10}$')).required().messages({
      'string.empty': 'Phone number field cannot be empty',
      'string.pattern.base': 'The value provided should only be of type number and made of 10 characters'
    }),
    email: joi.string().email().required().messages({
      'string.empty': 'Email is required',
      'string.email.invalid': 'Please enter a valid email'
    }),
    location: joi.string().min(5).max(40).required().messages({
      'string.empty': 'Please enter value in address field, 5 charachers or more'
    }),
    profileImage: joi.string(),
    password: joi.string().required(),
    userRole: joi.string().required()
  });
import joi from 'joi';

export const eventSchema = joi.object({
  eventName: joi.string().required().messages({
    'string.empty': 'Event name field cannot be empty'
  }),
  description: joi.string().required().messages({
    'string.empty': 'Please enter the short description',
    'string.max.invalid': 'Short description requires at max 16 charachters'
  }),
  longDescription: joi.string().required().messages({
    'string.empty': 'Long description cannot be empty'
  }),
  location: joi.string().required().messages({
    'string.empty': 'Location field cannot be empty'
  }),
  startDate: joi.date().required(),
  endDate: joi.date().required(),
  images: joi.string().required(),
  single: joi.number().required(),
  couple: joi.number().required(),
  groups: joi.number().required(),
  totalTickets: joi.number().required(),
  bookingDeadline: joi.date().required()
})
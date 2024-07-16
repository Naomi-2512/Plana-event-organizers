import joi from 'joi';

export const eventSchema = joi.object({
  eventName: joi.string().alphanum().min(6).max(40).required().messages({
    'string.empty': 'Event name field cannot be empty'
  }),
  description: joi.string().alphanum().min(3).max(16).required().messages({
    'string.empty': 'Please enter the short description',
    'string.max.invalid': 'Short description requires at max 16 charachters'
  }),
  longDescription: joi.string().alphanum().min(3).required().messages({
    'string.empty': 'Long description cannot be empty'
  }),
  location: joi.string().alphanum().min(5).required().messages({
    'string.empty': 'Location field cannot be empty'
  }),
  startDate: joi.date().required(),
  endDate: joi.ref('start_date'),
  images: joi.string().alphanum().required(),
  single: joi.number().required(),
  couple: joi.ref('singles'),
  groups: joi.ref('singles'),
  totalTickets: joi.number().required(),
  bookingDeadline: joi.ref('start_date')
})
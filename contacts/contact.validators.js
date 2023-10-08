const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().optional(),
});

const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
});

const contactValidationMiddleware = (req, res, next) => {
  const newContact = req.body;

  const { error } = contactSchema.validate(newContact);

  if (error) {
    res.status(400).send({ error: error.message });
  }
  return next();
};

module.exports = {
  contactValidationMiddleware,
  updateContactSchema,
  createContactSchema,
};

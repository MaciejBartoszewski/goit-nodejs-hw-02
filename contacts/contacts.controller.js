const Joi = require("joi");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("./contacts.service");

const listContactsHandler = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    return res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactByIdHandler = async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const removeContactHandler = async (req, res, next) => {
  try {
    const contact = await removeContact(req.params.contactId);
    if (contact) {
      return res.status(200).json({ message: "contact deleted" });
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
};

const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const addContactHandler = async (req, res, next) => {
  try {
    const { error } = createContactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
});
const updateContactHandler = async (req, res, next) => {
  try {
    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const updatedContact = await updateContact(req.params.contactId, req.body);
    if (updatedContact) {
      return res.status(200).json(updatedContact);
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
};

const updateStatusContactHandler = async (req, res, next) => {
  try {
    const updatedStatusContact = await updateStatusContact(
      req.params.contactId,
      req.body
    );
    if (updatedStatusContact) {
      return res.status(200).json(updatedStatusContact);
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listContactsHandler,
  getContactByIdHandler,
  removeContactHandler,
  addContactHandler,
  updateContactHandler,
  updateStatusContactHandler,
};

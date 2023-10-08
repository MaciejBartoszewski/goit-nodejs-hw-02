const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("./contacts.service");

const {
  createContactSchema,
  updateContactSchema,
} = require("./contact.validators");

const listContactsHandler = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
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
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
};

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
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
};

const updateStatusContactHandler = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { body } = req;

    const updatedStatusContact = await updateStatusContact(contactId, body);
    if (updatedStatusContact) {
      return res.status(200).json(updatedStatusContact);
    } else {
      res.status(404).json({ message: "Not found" });
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

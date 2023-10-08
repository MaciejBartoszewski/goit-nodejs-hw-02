const { Contact } = require("./contact.model");

const listContacts = async () => {
  try {
    const contacts = await Contact.find();
    return contacts;
  } catch (e) {
    console.error(e.message);
    return "error contact list";
  }
};

const getContactById = async (id) => {
  try {
    return await Contact.findById(id);
  } catch (e) {
    console.error(e.message);
    return "error get contact by id";
  }
};

const removeContact = async (id) => {
  try {
    return await Contact.findByIdAndDelete(id);
  } catch (e) {
    console.error(e.message);
    return "error remove contact";
  }
};

const addContact = async (contact) => {
  try {
    const newContact = new Contact(contact);
    const savedContact = await newContact.save();
    return savedContact;
  } catch (e) {
    console.error(e.message);
    return "error save contact";
  }
};

const updateContact = async (id, modifiedContact) => {
  try {
    return await Contact.findByIdAndUpdate(id, modifiedContact, { new: true });
  } catch (e) {
    console.error(e.message);
    return "error update contact";
  }
};

const updateStatusContact = async (id, modifiedContact) => {
  try {
    return await Contact.findByIdAndUpdate(id, modifiedContact, { new: true });
  } catch (e) {
    console.error(e.message);
    return "error status";
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};

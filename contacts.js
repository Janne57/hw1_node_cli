const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

// Returns an array of contacts
async function listContacts() {
  try {
    const jsonReadResult = await fs.readFile(contactsPath);
    const contacts = JSON.parse(jsonReadResult);
    return contacts;
  } catch (error) {
    console.log(error);
  }
}

//Returns a contact object with this id.
async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contactById = contacts.find(
      ({ id, name, email, phone }) => id === contactId
    );
    if (!contactById) {
      return null;
    }
    return contactById;
  } catch (error) {
    console.log(error.message);
  }
}

//Returns the remote contact object.
async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const contactDelete = contacts.filter(({ id }) => id === contactId);
    
    if (contactDelete.length === 0) {
      return null;
    }
    return contactDelete;
    
  } catch (error) {}
}

//Returns the added contact object.
async function addContact(name, email, phone) {
  try {
    const addNewContact = {
      id: nanoid(),
      name: name,
      email: email,
      phone: phone,
    };

    const contacts = await listContacts();
    contacts.push(addNewContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, " "));

    console.log(`The contact is added in ${contactsPath}`.yellow);
    return addNewContact;
  } catch (error) {
    console.log(error.red);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

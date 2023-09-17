const contact = require("./contacts");
// const readline = require("readline");
require("colors");
const nodemon = require("nodemon");
const { Command } = require("commander");
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const resList = await contact.listContacts();
      return console.table(resList);
      

    case "get":
      const resContactById = await contact.getContactById(id);
      return console.log(resContactById);
      

    case "add":
      const resAddContact = await contact.addContact(name, email, phone);
      return console.log(resAddContact);
      

    case "remove":
      const resRemoveContact = await contact.removeContact(id);
      return console.log(resRemoveContact);
      

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);


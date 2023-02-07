const { program } = require("commander");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await listContacts();
      console.table(contacts);
      return contacts;

    case "get":
      const contact = await getContactById(id);
      if (!contact) {
        throw new Error(`Contact with id=${id} not found`);
      }
      return contact;

    case "add":
      const updateListContact = addContact(name, email, phone);
      return updateListContact;

    case "remove":
      const deletedContact = await removeContact(id);
      if (!deletedContact) {
        throw new Error(`Contact with id=${id} not found`);
      }
      return deletedContact;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

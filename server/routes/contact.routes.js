import { Router } from "express"
import { createContact,getContacts,deleteContact } from "../controllers/contact.controller.js";
const contactsRouter = Router();

contactsRouter.post("/create-contact",createContact);
contactsRouter.get("/get-contacts",getContacts);
contactsRouter.delete("/delete-contact/:id",deleteContact);

export default contactsRouter;
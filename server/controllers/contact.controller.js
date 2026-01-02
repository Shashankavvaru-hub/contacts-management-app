import { Contact } from "../models/contact.model.js";
export const createContact = async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone) {
    return res.status(500).json({ message: "Required fields are missing" });
  }

  const contact = await Contact.create({ name, email, phone, message });
  res.status(201).json(contact);
};

export const getContacts = async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
};

export const deleteContact = async (req,res) => {
  try{
    const {id} = req.params;
    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
      data: deletedContact,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

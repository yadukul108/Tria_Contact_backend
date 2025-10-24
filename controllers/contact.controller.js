const Contact = require("../model/contact.model.js");

// Fetch all contacts
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const createContact = async (req, res) => {
  try {
    const { firstName, surname, phone, email, note, profileImage, isFavorite } = req.body;

    const newContact = await Contact.create({
      firstName,
      surname,
      phone,
      email,
      note: note || "",
      profileImage: profileImage || "",
      isFavorite: isFavorite || false,
    });

    res.status(201).json(newContact);
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate key error
      if (err.keyPattern.phone) {
        return res.status(400).json({ error: "Phone number should be 10 digits and is required and unique" });
      }
      if (err.keyPattern.email) {
        return res.status(400).json({ error: "Email should be unique" });
      }
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
  }
};
// Edit a contact
const editContact = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedContact) return res.status(404).json({ error: "Contact not found" });
    res.status(200).json(updatedContact);
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate key error
      if (err.keyPattern.phone) {
        return res.status(400).json({ error: "Phone number should be 10 digits and is required and unique" });
      }
      if (err.keyPattern.email) {
        return res.status(400).json({ error: "Email should be unique" });
      }
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
  }
};

// Delete a contact
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) return res.status(404).json({ error: "Contact not found" });
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getAllContacts, editContact, deleteContact, createContact };

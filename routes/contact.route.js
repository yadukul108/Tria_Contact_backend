const express = require("express");
const router = express.Router();
const { getAllContacts, editContact, deleteContact,createContact } = require("../controllers/contact.controller.js");

// Routes
router.get("/", getAllContacts);
router.put("/:id", editContact);
router.delete("/:id", deleteContact);
router.post("/", createContact);
module.exports = router;

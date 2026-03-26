const express = require("express");
const router = express.Router();
const {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  toggleFavorite,
} = require("../controllers/contactcontroller");

router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContactById).put(updateContact).delete(deleteContact);
router.patch("/:id/favorite", toggleFavorite);

module.exports = router;
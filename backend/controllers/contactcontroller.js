const Contact = require("../models/contact");

// @desc  Get all contacts (with optional search)
// @route GET /api/contacts
const getContacts = async (req, res, next) => {
  try {
    const { search, category } = req.query;

    let filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
      ];
    }

    if (category && category !== "all") {
      filter.category = category;
    }

    const contacts = await Contact.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    next(error);
  }
};

// @desc  Get single contact
// @route GET /api/contacts/:id
const getContactById = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      const err = new Error("Contact not found");
      err.statusCode = 404;
      return next(err);
    }

    res.json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
};

// @desc  Create contact
// @route POST /api/contacts
const createContact = async (req, res, next) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
};

// @desc  Update contact
// @route PUT /api/contacts/:id
const updateContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!contact) {
      const err = new Error("Contact not found");
      err.statusCode = 404;
      return next(err);
    }

    res.json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
};

// @desc  Delete contact
// @route DELETE /api/contacts/:id
const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      const err = new Error("Contact not found");
      err.statusCode = 404;
      return next(err);
    }

    res.json({ success: true, message: "Contact deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// @desc  Toggle favorite
// @route PATCH /api/contacts/:id/favorite
const toggleFavorite = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      const err = new Error("Contact not found");
      err.statusCode = 404;
      return next(err);
    }

    contact.isFavorite = !contact.isFavorite;
    await contact.save();

    res.json({ success: true, data: contact });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  toggleFavorite,
};
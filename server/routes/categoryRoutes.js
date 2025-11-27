const express = require('express');
const router = express.Router();
const { getCategories, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');
const { protect } = require('../middleware/auth');
const { adminAuth } = require('../middleware/adminAuth');

router.route('/')
    .get(getCategories)
    .post(protect, adminAuth, createCategory);

router.route('/:id')
    .put(protect, adminAuth, updateCategory)
    .delete(protect, adminAuth, deleteCategory);

module.exports = router;

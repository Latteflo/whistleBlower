const {
  createCategory,
  getAllCategories,
  getReportsByCategoryId,
} = require('../models/CategoryModel');

exports.createCategory = async (req, res) => {
  try {
    const category = await createCategory(req.body.name);
    res.status(201).json({ message: 'Category created successfully', data: category });
  } catch (error) {
    res.status(400).json({ message: 'Error creating category', error });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.status(200).json({ data: categories });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving categories', error });
  }
};

exports.getReportsByCategory = async (req, res) => {
  try {
    const reports = await getReportsByCategoryId(req.params.id);
    if (reports.length === 0) {
      return res.status(404).json({ message: 'Reports not found for this category' });
    }
    res.status(200).json({ data: reports });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving reports by category', error });
  }
};
import {
  createCategoryModel,
  getAllCategoriesModel,
  getCategoryByIdModel,
  getReportsByCategoryIdModel,
  updateCategoryModel,
  deleteCategoryModel
} from '../models/CategoryModel.mjs';

// Function to create a category
export const createCategory = async (req, res) => {
  const { name } = req.body;
  
  if (!name) {
    return res.status(400).json({ message: 'Name field is required' });
  }

  try {
    const category = await createCategoryModel(name);
    res.status(201).json({ message: 'Category created successfully', data: category });
  } catch (error) {
    console.error('Error while creating category:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};
// Function to get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await getAllCategoriesModel();
    res.status(200).json({ data: categories });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving categories', error });
  }
};

// Function to get a category by ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await getCategoryByIdModel(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ data: category });
  } catch (error) {
    res.status(400).json({ message: 'Error retrieving category', error });
  }
};


// Function to get reports by category ID
export const getReportsByCategoryId= async (req, res) => {
  try {
    const reports = await getReportsByCategoryIdModel(req.params.id);
    if (reports.length === 0) {
      return res.status(404).json({ message: 'Reports not found for this category' });
    }
    res.status(200).json({ data: reports });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving reports by category', error });
  }
};

// Function to update a category
export const updateCategory = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  if (!name || !id) {
    return res.status(400).json({ message: 'Name and ID fields are required' });
  }

  try {
    const category = await updateCategoryModel(id, name);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category updated successfully', data: category });
  } catch (error) {
    console.error('Error while updating category:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

// Function to delete a category
export const deleteCategory = async (req, res) => {
  try {
    const category = await deleteCategoryModel(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting category', error });
  }
}
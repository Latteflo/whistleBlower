import { searchReports, searchCategories } from '../models/SearchModel'; 

export const searchReportsController = async (req, res) => {
  try {
    const query = req.query.q;
    const reports = await searchReports(query);
    res.status(200).json({ success: true, reports });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred while searching reports.' });
  }
};

export const searchCategoriesController = async (req, res) => {
  try {
    const query = req.query.q;
    const categories = await searchCategories(query);
    res.status(200).json({ success: true, categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred while searching categories.' });
  }
};

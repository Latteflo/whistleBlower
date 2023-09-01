import { getReportsByUserId } from '../models/ReportModel.mjs'; 
import { getAllCategories } from '../models/CategoryModel.mjs';


export const getClientDashboard = async (req, res) => {
  try {
    const userId = req.user.id; 

    // Fetching the client's reports and categories
    const reports = await getReportsByUserId(userId);
    const categories = await getAllCategories();

    // Returning the dashboard data
    res.status(200).json({
      success: true,
      reports,
      categories
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching the dashboard data.'
    });
  }
};

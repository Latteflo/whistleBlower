import { getAllReports } from '../models/ReportModel.mjs'; 

export const getAdminDashboard = async (req, res) => {
  try {
    const reports = await getAllReports();
    res.status(200).json({ success: true, reports });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'An error occurred while fetching the dashboard data.' });
  }
};

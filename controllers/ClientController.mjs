import {
  getReportsByUserIdModel,
} from "../models/ReportModel.mjs"
import { getAllCategoriesModel } from "../models/CategoryModel.mjs"

export const getClientDashboard = async (req, res) => {
  const userId = req.user.id

  try {
    // Fetching the client's reports and categories
    const reports = await getReportsByUserIdModel(userId)
    const categories = await getAllCategoriesModel()
    const reportsByStatus = reports.reduce((acc, report) => {
      acc[report.status] = (acc[report.status] || 0) + 1
      return acc
    }, {})

    // Returning the dashboard data
    res.status(200).json({
      success: true,
      reports,
      categories,
      reportsByStatus,
    })
  } catch (error) {
    console.error(
      `[ERROR] An error occurred while fetching the dashboard data for client with ID: ${userId}. Error details: ${error.message}`
    )
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the dashboard data.",
    })
  }
}

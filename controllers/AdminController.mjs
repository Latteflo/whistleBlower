import {
  getAllReportsModel,
  getReportsByCategoryIdModel,
} from "../models/ReportModel.mjs"
import { getReportsByPriorityIdModel } from "../models/PriorityModel.mjs"
import { getAllCategoriesModel } from "../models/CategoryModel.mjs"
import { createAuditLogModel } from "../models/AuditLogModel.mjs"

export const getAdminDashboard = async (req, res) => {
  const userId = req.user.id

  try {
    // Create an audit log for fetching admin dashboard data
    await createAuditLogModel(userId, null, "FETCH_ADMIN_DASHBOARD")


    // Fetching all reports for the admin dashboard
    const reports = await getAllReportsModel()
    const priorities = await getAllPrioritiesModel()
    const prioritiesById = await getReportsByPriorityIdModel() 
    const categories = await getAllCategoriesModel()
    const categoriesById = await getReportsByCategoryIdModel()


    // Group reports by status and priority for summary
    const reportsByStatus = reports.reduce((acc, report) => {
      acc[report.status] = (acc[report.status] || 0) + 1
      return acc
    }, {})

    const reportsByPriority = reports.reduce((acc, report) => {
      acc[report.priority] = (acc[report.priority] || 0) + 1
      return acc
    }, {})

    // Returning the dashboard data
    res.status(200).json({
      success: true,
      reports,
      reportsByStatus,
      reportsByPriority,
      priorities,
      prioritiesById,
      categories,
      categoriesById,
    })
  } catch (error) {
    console.error(
      `[ERROR] An error occurred while fetching the admin dashboard data. Error details: ${error.message}`
    )
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the dashboard data.",
    })
  }
}

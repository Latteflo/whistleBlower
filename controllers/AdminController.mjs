import {
  getAllReports,
  getReportsByPriorityId,
  getReportsByCategoryId,
} from "../models/ReportModel.mjs"
import { getAllCategories } from "../models/CategoryModel.mjs"
import { createAuditLog } from "../models/AuditLogModel.mjs"

export const getAdminDashboard = async (req, res) => {
  const userId = req.user.id

  try {
    // Create an audit log for fetching admin dashboard data
    await createAuditLog(userId, null, "FETCH_ADMIN_DASHBOARD")


    // Fetching all reports for the admin dashboard
    const reports = await getAllReports()
    const priorities = await getAllPrioritiesModel() 

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
      getReportsByCategoryId,
      getReportsByPriorityId,
      getAllCategories,
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

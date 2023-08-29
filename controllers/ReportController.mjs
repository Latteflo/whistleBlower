import {
  createReport as createReportModel,
  getReportById as getReportByIdModel,
  getAllReports as getAllReportsModel,
  updateReport as updateReportByIdModel,
  deleteReport as deleteReportByIdModel,
} from "../models/ReportModel.mjs"
import { pool } from "../config/db.mjs"
import { updateReportStatus } from "../models/ReportModel.mjs";

// Function to create a report
export const createReport = async (req, res) => {
  try {
    console.log("Received body:", req.body);
    console.log("Received user ID:", req.user.id);
    const userId = req.user.id;
    const report = await createReportModel(req.body, userId);
    res.status(201).json({ message: "Report created successfully", data: report });
  } catch (error) {
    console.log("Error:", error);
    res.status(400).json({ message: "Error creating report", error });
  }
};


// Function to get a report by id
export const getReportById = async (req, res) => {
  try {
    const report = await getReportByIdModel(req.params.id)
    if (!report) {
      return res.status(404).json({ message: "Report not found" })
    }
    res.status(200).json({ data: report })
  } catch (error) {
    res.status(400).json({ message: "Error retrieving report", error })
  }
}

// Function to update a report
export const updateReport = async (req, res) => {
  try {
    const report = await updateReportByIdModel(req.params.id, req.body)
    if (!report) {
      return res.status(404).json({ message: "Report not found" })
    }
    res
      .status(200)
      .json({ message: "Report updated successfully", data: report })
  } catch (error) {
    res.status(400).json({ message: "Error updating report", error })
  }
}

// Function to delete a report
export const deleteReport = async (req, res) => {
  try {
    const report = await deleteReportByIdModel(req.params.id)
    if (!report) {
      return res.status(404).json({ message: "Report not found" })
    }
    res.status(200).json({ message: "Report deleted successfully" })
  } catch (error) {
    res.status(400).json({ message: "Error deleting report", error })
  }
}

// Function to get all reports
export const getAllReports = async (req, res) => {
  try {
    const reports = await getAllReportsModel()
    res.status(200).json({ data: reports })
  } catch (error) {
    console.error(error)
    res.status(400).json({ message: "Error retrieving reports", error })
  }
}

// Function to retrieve reports by priority color
export const getReportsByPriorityColor = async (color) => {
  const query = `
      SELECT reports.*
      FROM reports
      JOIN priority ON reports.priority_id = priority.id
      WHERE priority.color_code = $1
    `
  try {
    const result = await pool.query(query, [color])
    return result.rows
  } catch (err) {
    throw err
  }
}

// Function to retrieve reports by status
export const updateReportStatusController = async (req, res) => {
  try {
    const reportId = req.params.id;
    const status = req.body.status;

    // Updating the report's status
    await updateReportStatus(reportId, status);

    // Returning a success response
    res.status(200).json({
      success: true,
      message: 'Report status updated successfully.'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while updating the report status.'
    });
  }
};


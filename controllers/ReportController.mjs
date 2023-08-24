import {
  createReport as createReportModel,
  getReportById as getReportByIdModel,
  updateReport as updateReportModel,
  deleteReport as deleteReportModel,
} from '../models/ReportModel.mjs';
import { pool } from "../config/db.mjs";

export const createReport = async (req, res) => {
  try {
    const report = await createReportModel(req.body);
    res.status(201).json({ message: "Report created successfully", data: report });
  } catch (error) {
    res.status(400).json({ message: "Error creating report", error });
  }
};

export const getReportById = async (req, res) => {
  try {
    const report = await getReportByIdModel(req.params.id);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.status(200).json({ data: report });
  } catch (error) {
    res.status(400).json({ message: "Error retrieving report", error });
  }
};

export const updateReport = async (req, res) => {
  try {
    const report = await updateReportByIdModel(req.params.id, req.body);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.status(200).json({ message: "Report updated successfully", data: report });
  } catch (error) {
    res.status(400).json({ message: "Error updating report", error });
  }
};

export const deleteReport = async (req, res) => {
  try {
    const report = await deleteReportByIdModel(req.params.id);
    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }
    res.status(200).json({ message: "Report deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting report", error });
  }
};

export const getAllReports = async (req, res) => {
  try {
    const reports = await getAllReportsModel();
    res.status(200).json({ data: reports });
  } catch (error) {
    res.status(400).json({ message: "Error retrieving reports", error });
  }
};

// Function to retrieve reports by priority color
export const getReportsByPriorityColor = async (color) => {
  const query = `
      SELECT reports.*
      FROM reports
      JOIN priority ON reports.priority_id = priority.id
      WHERE priority.color_code = $1
    `;
  try {
    const result = await pool.query(query, [color]);
    return result.rows;
  } catch (err) {
    throw err;
  }
};

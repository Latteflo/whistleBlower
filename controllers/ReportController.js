const {
    createReport,
    getReportById,
    updateReportById,
    deleteReportById,
  } = require('../models/ReportModel');
  const { pool } = require('../config/db');

  exports.createReport = async (req, res) => {
    try {
      const report = await createReport(req.body);
      res.status(201).json({ message: 'Report created successfully', data: report });
    } catch (error) {
      res.status(400).json({ message: 'Error creating report', error });
    }
  };
  
  exports.getReportById = async (req, res) => {
    try {
      const report = await getReportById(req.params.id);
      if (!report) {
        return res.status(404).json({ message: 'Report not found' });
      }
      res.status(200).json({ data: report });
    } catch (error) {
      res.status(400).json({ message: 'Error retrieving report', error });
    }
  };
  
  exports.updateReport = async (req, res) => {
    try {
      const report = await updateReportById(req.params.id, req.body);
      if (!report) {
        return res.status(404).json({ message: 'Report not found' });
      }
      res.status(200).json({ message: 'Report updated successfully', data: report });
    } catch (error) {
      res.status(400).json({ message: 'Error updating report', error });
    }
  };
  
  exports.deleteReport = async (req, res) => {
    try {
      const report = await deleteReportById(req.params.id);
      if (!report) {
        return res.status(404).json({ message: 'Report not found' });
      }
      res.status(200).json({ message: 'Report deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Error deleting report', error });
    }
  };

// Function to retrieve reports by priority color
const getReportsByPriorityColor = async (color) => {
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

exports.getReportsByPriorityColor = getReportsByPriorityColor;

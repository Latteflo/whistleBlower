const {
  initializePriorities,
  getAllPriorities,
} = require("../models/PriorityModel")
const { pool } = require("../config/db")
const { getReportsByPriorityColor } = require("../models/ReportModel")


exports.initializePriorities = async (req, res) => {
  try {
    await initializePriorities()
    res.status(200).json({ message: "Priorities initialized successfully" })
  } catch (error) {
    res.status(500).json({ message: "Error initializing priorities", error })
  }
}

exports.getAllPriorities = async (req, res) => {
  try {
    const priorities = await getAllPriorities()
    res.status(200).json({ data: priorities })
  } catch (error) {
    res.status(500).json({ message: "Error retrieving priorities", error })
  }
}

exports.getReportsByPriorityColor = async (req, res) => {
  try {
    const colorCode = req.params.colorCode || null
    let query = `
      SELECT reports.* 
      FROM reports 
      JOIN priority ON reports.priority_id = priority.id
    `

    if (colorCode) {
      query += " WHERE priority.color_code = $1"
    }

    const result = await pool.query(query, colorCode ? [colorCode] : [])
    res.status(200).json({ data: result.rows })
  } catch (error) {
    res.status(500).json({ message: "Error retrieving reports", error })
  }
}


exports.getQueriesByColor = async (req, res) => {
  try {
    const color = req.params.color
    const queries = await getReportsByPriorityColor(color)
    res.status(200).json({ data: queries })
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error retrieving queries by priority color", error })
  }
}

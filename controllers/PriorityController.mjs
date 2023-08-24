import {
  initializePriorities as initializePrioritiesModel,
  getAllPriorities as getAllPrioritiesModel,
} from "../models/PriorityModel.mjs"
import { pool } from "../config/db.mjs"
import { getReportsByPriorityColor as getReportsByPriorityColorModel } from "../models/ReportModel.mjs"

export const initializePriorities = async (req, res) => {
  try {
    await initializePrioritiesModel()
    res.status(200).json({ message: "Priorities initialized successfully" })
  } catch (error) {
    res.status(500).json({ message: "Error initializing priorities", error })
  }
}

export const getAllPriorities = async (req, res) => {
  try {
    const priorities = await getAllPrioritiesModel()
    res.status(200).json({ data: priorities })
  } catch (error) {
    res.status(500).json({ message: "Error retrieving priorities", error })
  }
}

export const getReportsByPriorityColor = async (req, res) => {
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

export const getQueriesByColor = async (req, res) => {
  try {
    const color = req.params.color
    const queries = await getReportsByPriorityColorModel(color)
    res.status(200).json({ data: queries })
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error retrieving queries by priority color", error })
  }
}

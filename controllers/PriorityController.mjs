import {
  initializePrioritiesModel,
  getAllPrioritiesModel,
  getReportsByPriorityColorModel,
  getReportsByPriorityIdModel,
} from "../models/PriorityModel.mjs"

// Function to initialize priorities
export const initializePriorities = async (req, res) => {
  try {
    await initializePrioritiesModel()
    console.log("Successfully initialized priorities")
    res.status(200).json({ success: true, message: "Priorities initialized successfully" })
  } catch (error) {
    console.error("Error initializing priorities:", error)
    res.status(500).json({success: false,  message: "Error initializing priorities", error })
  }
}

// Function to get all priorities
export const getAllPriorities = async (req, res) => {
  try {
    const priorities = await getAllPrioritiesModel()
    console.log("Successfully retrieved all priorities")
    res.status(200).json({success: true,  data: priorities })
  } catch (error) {
    console.error({success: false, message: "Error retrieving priorities:", error})
    res.status(500).json({ success: false, message: "Error retrieving priorities", error })
  }
}

// Function to get reports by priority ID
export const getReportsByPriorityId = async (req, res) => {
  try {
    const reports = await getReportsByPriorityIdModel(req.params.id)
    if (reports.length === 0) {
      console.warn("No reports found for this priority ID:", req.params.id)
      return res
        .status(404)
        .json({success: false,  message: "Reports not found for this priority" })
    }
    console.log("Successfully retrieved reports by priority ID")
    res.status(200).json({ success: true, data: reports })
  } catch (error) {
    console.error("Error retrieving reports by priority ID:", error)
    res
      .status(500)
      .json({ success: false, message: "Error retrieving reports by priority", error })
  }
}

// Function to retrieve reports by priority color
export const getReportsByPriorityColor = async (req, res) => {
  try {
    const reports = await getReportsByPriorityColorModel(req.params.color)
    if (reports.length === 0) {
      console.warn(
        "No reports found for this priority color:",
        req.params.color
      )
      return res
        .status(404)
        .json({success: false,  message: "Reports not found for this priority color" })
    }
    console.log("Successfully retrieved reports by priority color")
    res.status(200).json({success: true,  data: reports })
  } catch (error) {
    console.error("Error retrieving reports by priority color:", error)
    res
      .status(500)
      .json({success: false,  message: "Error retrieving reports by priority color", error })
  }
}

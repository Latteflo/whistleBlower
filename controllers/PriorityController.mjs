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
    res.status(200).json({ message: "Priorities initialized successfully" })
  } catch (error) {
    res.status(500).json({ message: "Error initializing priorities", error })
  }
}

// Function to get all priorities
export const getAllPriorities = async (req, res) => {
  try {
    const priorities = await getAllPrioritiesModel()
    res.status(200).json({ data: priorities })
  } catch (error) {
    res.status(500).json({ message: "Error retrieving priorities", error })
  }
}


// Function to get reports by priority ID
export const getReportsByPriorityId= async (req, res) => {
  try {
    const reports = await getReportsByPriorityIdModel(req.params.id)
    if (reports.length === 0) {
      return res.status(404).json({ message: "Reports not found for this priority" })
    }
    res.status(200).json({ data: reports })
  } catch (error) {
    res.status(500).json({ message: "Error retrieving reports by priority", error })
  }
}


// Function to retrieve reports by priority color
export const getReportsByPriorityColor = async (req, res) => {
  try { 
    const reports = await getReportsByPriorityColorModel(req.params.color)
    if (reports.length === 0) {
      return res.status(404).json({ message: "Reports not found for this priority" })
    }
    res.status(200).json({ data: reports })
  }
  catch (error) {
    res.status(500).json({ message: "Error retrieving reports by priority", error })
  }
}

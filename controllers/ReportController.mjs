import {
  createReportModel,
  getAllReportsModel,
  getReportByIdModel,
  updateReportByIdModel,
  deleteReportByIdModel,
  getReportsByUserIdModel,
  updateReportStatusModel,
  getReportsByStatusModel,
  updateReportMediaModel,
  getReportsByCategoryIdModel,
} from "../models/ReportModel.mjs"
import { uploadToCloudinary } from "../config/storageConfig.mjs"

// Function to create a report
export const createReport = async (req, res) => {
  try {
    const userId = req.user.id
    const { body, files } = req

    // Initialize mediaURL to be empty
    let mediaURL = ""

    if (files && files.media) {
      // Convert the uploaded file to a Buffer
      const mediaBuffer = Buffer.from(files.media.data)

      // Upload media to Cloudinary and get the shareable link
      const cloudinaryLink = await uploadToCloudinary(
        mediaBuffer,
        files.media.name
      )

      if (cloudinaryLink) {
        mediaURL = cloudinaryLink
      } else {
        return res.status(400).json({ message: "Failed to upload media" })
      }
    }

    // Add or replace the media URL in the report data
    body.mediaURL = mediaURL

    const report = await createReportModel(body, userId)
    res
      .status(201)
      .json({ message: "Report created successfully", data: report })
  } catch (error) {
    console.error("Error while creating report: ", error)
    res.status(500).send("Internal Server Error")
  }
}

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

// Function to get reports by user ID
export const getReportsByUserId = async (req, res) => {
  try {
    const reports = await getReportsByUserIdModel(req.user.id)
    res.status(200).json({ data: reports })
  } catch (error) {
    res.status(400).json({ message: "Error retrieving reports", error })
  }
}

// Function to update a report
export const updateReport = async (req, res) => {
  try {
    const { body, files } = req

    if (files && files.media) {
      const mediaBuffer = Buffer.from(files.media.data)

      const cloudinaryLink = await uploadToCloudinary(
        mediaBuffer,
        files.media.name
      )

      if (cloudinaryLink) {
        body.mediaURL = cloudinaryLink
      } else {
        return res.status(400).json({ message: "Failed to upload media" })
      }
    }

    const report = await updateReportByIdModel(req.params.id, body)
    if (!report) {
      return res.status(404).json({ message: "Report not found" })
    }
    res
      .status(200)
      .json({ message: "Report updated successfully", data: report })
  } catch (error) {
    console.error("Error updating report: ", error)
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

// Function to update the status of a report
export const updateReportStatusById = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body
    const updatedReport = await updateReportStatusModel(id, status)

    if (updatedReport) {
      res.json({ success: true, report: updatedReport })
    } else {
      res
        .status(400)
        .json({ success: false, message: "Failed to update report status." })
    }
  } catch (error) {
    console.error("Error updating report status:", error)
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the report status.",
    })
  }
}

// Endpoint to update media for a report
export const updateReportMedia = async (req, res) => {
  try {
    const { files } = req
    const { id: reportId } = req.params

    let newMediaURL = ""

    if (files && files.media) {
      // Upload media to Cloudinary
      const result = await cloudinary.v2.uploader.upload(files.media.path)
      newMediaURL = result.secure_url

      // Update the media URL in the database
      const updatedReport = await updateReportMediaModel(reportId, newMediaURL)

      if (updatedReport) {
        return res.status(200).json({ success: true, updatedReport })
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Failed to update media." })
      }
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Media file is missing." })
    }
  } catch (error) {
    console.error("An error occurred while updating media:", error)
    return res
      .status(500)
      .json({
        success: false,
        message: "An error occurred while updating media.",
      })
  }
}

// Function to get reports by category ID
export const getReportsByCategoryId = async (req, res) => {
  try {
    const reports = await getReportsByCategoryIdModel(req.params.id)
    res.status(200).json({ data: reports })
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error retrieving reports by category", error })
  }
}

// Function to get reports by status
export const getReportsByStatus = async (req, res) => {
  try {
    const reports = await getReportsByStatusModel(req.params.status)
    res.status(200).json({ data: reports })
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error retrieving reports by status", error })
  }
}

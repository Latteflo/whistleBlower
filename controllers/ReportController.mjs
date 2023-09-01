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
} from "../models/ReportModel.mjs";

// Function to create a report
export const createReport = async (req, res) => {
  try {
    const userId = req.user.id;
    const report = await createReportModel(req.body, userId);
    res.status(201).json({ message: "Report created successfully", data: report });
  } catch (error) {
    console.error("Error while creating report: ", error);
    res.status(500).send("Internal Server Error");
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

// Function to update the status of a report
export const updateReportStatusById = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedReport = await updateReportStatusModel(id, status);  // Call the model function

    if (updatedReport) {
      res.json({ success: true, report: updatedReport });
    } else {
      res.status(400).json({ success: false, message: "Failed to update report status." });
    }
  } catch (error) {
    console.error("Error updating report status:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the report status.",
    });
  }
};



// Endpoint to update media for a report
export const updateReportMedia = async (req, res) => {
  try {
    console.log("Received request to update media", req.body);
    const { reportId, newMediaURL } = req.body;
    const updatedReport = await updateReportMediaModel(reportId, newMediaURL);

    if (updatedReport) {
      console.log("Successfully updated media for report", updatedReport);
      res.status(200).json({ success: true, updatedReport });
    } else {
      console.warn("Failed to update media for reportId:", reportId);
      res.status(400).json({ success: false, message: 'Failed to update media.' });
    }
  } catch (error) {
    console.error("An error occurred while updating media:", error);
    res.status(500).json({ success: false, message: 'An error occurred while updating media.' });
  }
};

// Function to get reports by category ID
export const getReportsByCategoryId = async (req, res) => {
  try {
    const reports = await getReportsByCategoryIdModel(req.params.id)
    res.status(200).json({ data: reports })
  } catch (error) {
    res.status(400).json({ message: "Error retrieving reports by category", error })
  }
}

// Function to get reports by status
export const getReportsByStatus = async (req, res) => {
  try {
    const reports = await getReportsByStatusModel(req.params.status)
    res.status(200).json({ data: reports })
  } catch (error) {
    res.status(400).json({ message: "Error retrieving reports by status", error })
  }
}

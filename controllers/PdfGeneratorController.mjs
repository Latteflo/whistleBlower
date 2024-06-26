import axios from 'axios';
import {getReportByIdModel } from "../models/ReportModel.mjs"
import {getCategoryByIdModel} from "../models/CategoryModel.mjs"
import {getPriorityByIdModel} from "../models/PriorityModel.mjs"
import {getUserByIdModel} from "../models/UserModel.mjs"
import dotenv from 'dotenv'

dotenv.config()


export const generateReportPDF = async (req, res) => {
  try {
    const reportId = req.params.id;
    const report = await getReportByIdModel(reportId);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    // Fetch additional data based on their IDs
    const category = await getCategoryByIdModel(report.category_id);
    const priority = await getPriorityByIdModel(report.priority_id);
    const user = report.is_anonymous ? null : await getUserByIdModel(report.user_id);

    if (!req.user) {
      return res.status(401).json({success: false,  message: "User is not authenticated" });
    }
    
    const mappedReportData = {
      ReportTitle: report.title,
      ReportDescription: report.description,
      IsAnonymous: report.is_anonymous ? "Yes" : "No",
      InvolveOthers: report.involve_others ? "Yes" : "No",
      ReportStatus: report.status,
      SubmittedAt: new Date(report.submitted_at).toLocaleString(),
      SubmittedBy: report.is_anonymous ? "Anonymous" : `${user.username}`,
      ReportCategory: category ? category.name : "N/A",
      ReportPriority: priority ? priority.name : "N/A",
      ReportPriorityColor: priority ? priority.color_code : "N/A",
      MediaURL: report.media,
      GeneratedByAdminID: req.user.id,
      GeneratedByAdminUsername: req.user.username,
    };

    const apiEndpoint = `https://us1.pdfgeneratorapi.com/api/v4/templates/749566`;
    const apiHeaders = {
      Authorization: `Bearer ${process.env.PDF_API_KEY}`,
      "X-Auth-Secret": process.env.PDF_API_SECRET,
    };

    const pdfResponse = await axios.post(apiEndpoint, mappedReportData, { headers: apiHeaders, responseType: 'arraybuffer' });

    if (pdfResponse.status === 200) {
      res.set({
        "Content-Type": "application/pdf",
        "Content-Length": pdfResponse.data.length,
      });
      res.send(pdfResponse.data);
    } else {
      res.status(500).send("PDF generation failed");
    }

  } catch (error) {
    console.error("Error in PDF generation:", error);
    res.status(500).send("Internal Server Error");
  }
};
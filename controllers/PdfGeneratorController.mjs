import { generatePDFWithAPI } from "../config/pdfConfig.mjs"
import { getReportByIdModel } from "../models/ReportModel.mjs"
import {getCategoryByIdModel} from "../models/CategoryModel.mjs"
import {getPriorityByIdModel} from "../models/PriorityModel.mjs"
import {getUserByIdModel} from "../models/UserModel.mjs"

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
      return res.status(401).json({ message: "User is not authenticated" });
    }
    
    // Map database fields to template fields
    const mappedReportData = {
      ReportTitle: report.title,
      ReportDescription: report.description,
      IsAnonymous: report.is_anonymous ? "Yes" : "No",
      InvolveOthers: report.involve_others ? "Yes" : "No",
      ReportStatus: report.status,
      SubmittedAt: new Date(report.submitted_at).toLocaleString(),
      SubmittedBy: report.is_anonymous ? "Anonymous" : `${user.first_name} ${user.last_name}`,
      ReportCategory: category ? category.name : "N/A",
      ReportPriority: priority ? priority.name : "N/A",
      ReportPriorityColor: priority ? priority.color_code : "N/A",
      MediaURL: report.media,
      GeneratedByAdminID: req.user.id,
      GeneratedByAdminUsername: req.user.username,
    };

    const pdf = await generatePDFWithAPI(mappedReportData);

    if (pdf) {
      res.set({
        "Content-Type": "application/pdf",
        "Content-Length": pdf.length,
      });
      res.send(pdf);
    } else {
      res.status(500).send("PDF generation failed");
    }
  } catch (error) {
    console.error("Error in PDF generation:", error);
    res.status(500).send("Internal Server Error");
  }
};
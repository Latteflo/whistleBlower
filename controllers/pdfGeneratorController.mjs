import { generatePDFWithAPI } from "../config/pdfConfig.mjs"
import { getReportByIdModel } from "../models/ReportModel.mjs"

export const generateReportPDF = async (req, res) => {
  try {
    const reportId = req.params.id;
    const report = await getReportByIdModel(reportId);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    const pdf = await generatePDFWithAPI(report);

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

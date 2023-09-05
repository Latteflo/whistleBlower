import { generatePDF } from "../config/pdfConfig.mjs"
import { getReportByIdModel } from "../models/ReportModel.mjs"

export const generateReportPDF = async (req, res) => {
  try {
    const reportId = req.params.id
    const report = await getReportByIdModel(reportId)

    if (!report) {
      return res.status(404).json({ message: "Report not found" })
    }
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Individual Report</title>
        <style>
            body {
                font-family: Arial, sans-serif;
            }
            .header, .content, .footer {
                margin: 20px;
                padding: 20px;
                border-radius: 8px;
            }
            .header, .footer {
                background-color: #f2f2f2;
            }
            .report-title {
                font-size: 24px;
                margin-bottom: 20px;
            }
            .label {
                font-weight: bold;
            }
            .media {
                max-width: 200px;
            }
        </style>
    </head>
    <body>
    
        <div class="header">
            <h1>Report Overview</h1>
        </div>
    
        <div class="content">
            <h2 class="report-title">${report.title}</h2>
            <p><span class="label">Report ID:</span> ${report.id}</p>
            ${
              report.is_anonymous
                ? ""
                : `<p><span class="label">User ID:</span> ${report.user_id}</p>`
            }
            <p><span class="label">Category ID:</span> ${report.category_id}</p>
            <p><span class="label">Priority ID:</span> ${report.priority_id}</p>
            <p><span class="label">Description:</span> ${report.description}</p>
            <p><span class="label">Is Anonymous:</span> ${
              report.is_anonymous ? "Yes" : "No"
            }</p>
            <p><span class="label">Involve Others:</span> ${
              report.involve_others ? "Yes" : "No"
            }</p>
            <p><span class="label">Status:</span> ${reportData.status}</p>
            <p><span class="label">Submitted At:</span> ${
              report.submitted_at
            }</p>
            <p><span class="label">Updated At:</span> ${report.updated_at}</p>
            ${
              report.media
                ? `<div><span class="label">Media:</span><img class="media" src="${report.media}" 
                alt="Media related to the report"></div>`
                : ""
            }
        </div>
    
        <div class="footer">
            <p>Generated on ${new Date().toLocaleString()}</p>
        </div>
    
    </body>
    </html>
  `

    const pdf = await generatePDF(htmlContent)

    if (pdf) {
      res.set({
        "Content-Type": "application/pdf",
        "Content-Length": pdf.length,
      })
      res.send(pdf)
    } else {
      res.status(500).send("PDF generation failed")
    }
  } catch (error) {
    console.error("Error in PDF generation:", error)
    res.status(500).send("Internal Server Error")
  }
}

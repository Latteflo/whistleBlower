import puppeteer from 'puppeteer';

export const generatePDF = async (htmlContent) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    await page.setContent(htmlContent);
  
    const pdf = await page.pdf({ format: 'A4' });
  
    await browser.close();
  
    return pdf;
  } catch (error) {
    console.error("Error in PDF generation:", error);
    return null;
  }
};

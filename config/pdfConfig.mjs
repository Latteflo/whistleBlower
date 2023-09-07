import https from 'https';
import dotenv from 'dotenv';

dotenv.config();

export const generatePDFWithAPI = async (reportData) => {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      hostname: 'us1.pdfgeneratorapi.com',
      port: null,
      path: '/api/v4/documents/generate',
      headers: {
        Authorization: `Bearer ${process.env.PDF_GENERATOR_API_KEY}`,
        'Content-Type': 'application/json',
      },
    };

    const req = https.request(options, (res) => {
      const chunks = [];
      res.on('data', (chunk) => {
        chunks.push(chunk);
      });

      res.on('end', () => {
        const body = Buffer.concat(chunks);
        resolve(body.toString());
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    const payload = {
      template: {
        id: '749566',
        data: reportData,
      },
      format: 'pdf',
      output: 'url',
      name: 'Generated Report',
    };

    req.write(JSON.stringify(payload));
    req.end();
  });
};

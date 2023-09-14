import { Readable } from 'stream';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

export const uploadToCloudinary = (mediaBuffer, fileName) => {
  return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream({
        resource_type: 'auto',
        public_id: fileName
      }, (error, result) => {
        if (error) {
          console.error('Cloudinary upload failed:', error.message);
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      });
  
      const readableStream = new Readable();
      readableStream.push(mediaBuffer);
      readableStream.push(null);
      readableStream.pipe(uploadStream);
    });
  };

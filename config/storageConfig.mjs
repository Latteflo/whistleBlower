import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Function to upload media to Cloudinary
export const uploadToCloudinary = async (mediaBuffer, fileName) => {
  try {
    const result = await cloudinary.v2.uploader.upload_stream({
      resource_type: 'auto', 
      public_id: fileName // Use the original file name as the public ID
    }, (error, result) => {
      if (error) {
        console.error('Cloudinary upload error:', error);
        return null;
      }
      // Return the secure URL of the uploaded resource
      return result.secure_url;
    });

    // Create a readable stream from the buffer and pipe it to Cloudinary
    const readableStream = new Readable().push(mediaBuffer).push(null);
    readableStream.pipe(result);
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    return null;
  }
};

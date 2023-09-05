import { Dropbox } from 'dropbox';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

// Initialize Dropbox SDK
export const dbx = new Dropbox({
  accessToken: process.env.DROPBOX_ACCESS_TOKEN,
  fetch: fetch
});

// Use a buffer to upload files to Dropbox
export const uploadToDropbox = async (buffer, fileName) => {
  try {
    const uploadResponse = await dbx.filesUpload({
      path: `/WhistleBlower-Becode-App/${fileName}`,
      contents: buffer
    });

    const linkResponse = await dbx.sharingCreateSharedLinkWithSettings({
      path: uploadResponse.path_lower
    });

    return linkResponse.url;

  } catch (error) {
    console.error(`Dropbox upload failed: ${error}`);
    return null;
  }
};


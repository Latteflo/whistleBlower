import multer from 'multer';
import { Dropbox } from 'dropbox';
import dotenv from 'dotenv';

dotenv.config();

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    console.log('Multer file filter:', file);
    cb(null, true);
  }
});

const dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN });

console.log('Dropbox Access Token:', process.env.DROPBOX_ACCESS_TOKEN);

export { upload, dbx };

import multer from 'multer';
import { Dropbox } from 'dropbox';
import dotenv from 'dotenv';

dotenv.config();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const dbx = new Dropbox({ accessToken : process.env.DROPBOX_ACCESS_TOKEN });

export { upload, dbx };
import multer from 'multer';
import { Dropbox } from 'dropbox';
import dotenv from 'dotenv';

dotenv.config();

const upload = multer({ dest: 'uploads/' });

const dbx = new Dropbox({ accessToken : process.env.DROPBOX_ACCESS_TOKEN });

export { upload, dbx };
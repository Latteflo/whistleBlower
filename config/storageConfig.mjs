import { Dropbox } from 'dropbox';
import dotenv from 'dotenv';

dotenv.config();

export default dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN });


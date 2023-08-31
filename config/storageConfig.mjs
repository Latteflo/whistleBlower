import { Dropbox } from 'dropbox';
import dotenv from 'dotenv';

dotenv.config();

export const dbx = new Dropbox({ accessToken: process.env.DROPBOX_ACCESS_TOKEN });

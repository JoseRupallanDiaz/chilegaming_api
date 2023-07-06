import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;
const DATABASE_URI = process.env.DATABASE_URI;
const KEY = process.env.KEY;

export {PORT, DATABASE_URI, KEY};
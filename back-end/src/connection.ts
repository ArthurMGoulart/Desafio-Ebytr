import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

const MONGO_DB_URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.iafrc.mongodb.net/${process.env.NODE_ENV}?retryWrites=true&w=majority`;

const connectToDatabase = (
  mongoDatabaseURI = process.env.MONGO_URI
    || MONGO_DB_URL,
) => mongoose.connect(mongoDatabaseURI);

export default connectToDatabase;

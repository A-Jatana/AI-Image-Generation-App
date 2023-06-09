import express from 'express';
import * as dotenv from 'dotenv'; //use environment variables
import { v2 as cloudinary } from 'cloudinary'; //for images

import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

export default router;
import express from 'express';
import multer from 'multer';

import {addNews, getNews} from '../controllers/news.controller.js';

const storage = multer.memoryStorage()

const upload = multer({storage: storage})

const router = express.Router()

router.get("/", getNews);
router.post("/", upload.single('image'), addNews);
router.get("/img/:image");

export default router;
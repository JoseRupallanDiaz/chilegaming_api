import express from 'express';
import multer from 'multer';

import {addNews, getNews, getImage, getCategories, searchNews} from '../controllers/news.controller.js';

const storage = multer.memoryStorage()

const upload = multer({storage: storage})

const router = express.Router()

router.get("/", getNews);
router.get("/categories", getCategories);
router.post("/", upload.single('image'), addNews);
router.get("/img/:id", getImage);
router.get("/search", searchNews);

export default router;
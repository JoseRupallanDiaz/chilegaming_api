import categoryModel from '../models/category.model.js';
import newsModel from '../models/news.model.js';
import imageModel from '../models/image.model.js';

async function getNews(req, res) {
    try {
        const news = newsModel.find();
        return res.status(200).send({news});
    } catch (e) {
        return res.status(500).send({e});
    }
}

async function addNews(req, res) {
    try {
        const image = new imageModel({image: req.file.buffer});
        await image.save();
        await newsModel.create({
            title: req.body.title,
            body: req.body.body,
            image: req.protocol+'://'+req.hostname+"/news/img/"+image.id,
            category: await categoryModel.findOne({name: req.body.category}).exec()
        });
        return res.status(201).send("News created successfully");
    } catch (e) {
        return res.status(500).send({e});
    }
}

async function getImage(req, res){
    try {
        const image = await imageModel.findById(req.params.id);
        if (!image) {
            return res.status(404).json({error: 'Imagen no encontrada'});
          }
          res.set({
            'Content-Type': 'image/png',
            'Content-Disposition': 'inline',
          });
          res.send(image.image);
    } catch (e) {
        return res.status(500).send({e});
    }
}

async function getCategories(req, res){
    try {
        const categories = await categoryModel.find();
        return res.status(200).send({categories});
    } catch (e) {
        return res.status(500).send({e});
    }
}

export {getNews, addNews, getImage, getCategories};
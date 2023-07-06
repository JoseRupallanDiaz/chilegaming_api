import newsModel from '../models/news.model';

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
        
    } catch (e) {
        return res.status(500).send({e});
    }
}

export {getNews, addNews};
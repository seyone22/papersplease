import connectMongo from './connectMongo';
import Paper from 'models/Paper.js';

export async function fetchPaperById(req) {
    console.log("CONNECTING TO MONGO");
    await connectMongo();
    console.log("CONNECTED TO MONGO");

    const paper = await Paper.findById(req).exec();

    return paper;
}

export async function fetchPapers() {
    console.log("CONNECTING TO MONGO");
    await connectMongo();
    console.log("CONNECTED TO MONGO");

    const papers = await Paper.find().exec();
    return papers;
}

export async function addPaper(req, res) {
    try {
        console.log("CONNECTING TO MONGO");
        await connectMongo();
        console.log("CONNECTED TO MONGO");

        console.log('CREATING DOCUMENT');
        const paper = await Paper.create(req.body);
        console.log("CREATED DOCUMENT");

        res.json({  paper });
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}
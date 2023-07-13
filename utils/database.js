import connectMongo from './connectMongo';
import Paper from 'models/Paper.js';

export async function fetchPaperById(id) {
    console.log("CONNECTING TO MONGO");
    await connectMongo();
    console.log("CONNECTED TO MONGO");

    const paper = await Paper.findById(id).exec();

    return paper;
}

export async function fetchPapers() {
    console.log("CONNECTING TO MONGO");
    await connectMongo();
    console.log("CONNECTED TO MONGO");

    const papers = await Paper.find().exec();
    return papers;
}
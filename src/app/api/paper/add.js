import connectMongo from '/utils/connectMongo';
import Paper from 'models/Paper';

export default async function addPaper(req, res) {
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
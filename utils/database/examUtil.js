import connectMongo from '../connectMongo';
import Exam from "../../models/Exam";

export async function fetchExamById(req) {
    console.log("CONNECTING TO MONGO");
    await connectMongo();
    console.log("CONNECTED TO MONGO");

    return await Exam.findById(req).exec();
}

export async function fetchExams() {
    console.log("CONNECTING TO MONGO");
    await connectMongo();
    console.log("CONNECTED TO MONGO");

    return await Exam.find().exec();
}

export async function addexam(req, res) {
    try {
        console.log("CONNECTING TO MONGO");
        await connectMongo();
        console.log("CONNECTED TO MONGO");

        console.log('CREATING DOCUMENT');
        const exam = await Question.create(req.body);
        console.log("CREATED DOCUMENT");

        res.json({exam});
    } catch (error) {
        console.log(error);
        res.json({error});
    }
}

export async function searchexam(req, res) {
    try {
        console.log("CONNECTING TO MONGO");
        await connectMongo();
        console.log("CONNECTED TO MONGO");
        let searchResult = await Question.find({$text: {$search: req}});
        console.log(searchResult);
        return searchResult;
    } catch (error) {
        console.log(error);
        return null;
    }
}
import connectMongo from '../connectMongo';
import Exam from "../../models/Exam";
import Question from "../../models/Question";

// Fetch Exam details
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

// Insert Exams
export async function insertExam(req, res) {
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

// Search Exams
export async function searchExams(req, res) {
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
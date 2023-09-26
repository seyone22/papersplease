import connectMongo from '../connectMongo';
import Question from "../../models/Question";

export async function fetchQuestionById(req) {
    console.log(req);
    console.log("CONNECTING TO MONGO");
    await connectMongo();
    console.log("CONNECTED TO MONGO");
    return await Question.findById(req).exec();
}

export async function fetchquestions() {
    console.log("CONNECTING TO MONGO");
    await connectMongo();
    console.log("CONNECTED TO MONGO");

    return await Question.find().exec();
}

export async function addquestion(req, res) {
    try {
        console.log("CONNECTING TO MONGO");
        await connectMongo();
        console.log("CONNECTED TO MONGO");

        console.log('CREATING DOCUMENT');
        const question = await Question.create(req.body);
        console.log("CREATED DOCUMENT");

        res.json({question});
    } catch (error) {
        console.log(error);
        res.json({error});
    }
}

export async function searchQuestions(req, res) {
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

export async function findQuestionsFromPaper(req, res) {
    try {

        console.log("CONNECTING TO MONGO");
        await connectMongo();
        console.log("CONNECTED TO MONGO");
        return await Question.find({paperId: req}).exec();
    } catch (error) {
        console.log(error);
        return null;
    }
}
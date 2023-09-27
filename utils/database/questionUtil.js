export const dynamic = "force-dynamic";
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
        //let searchResdult = await Question.find({$text: {$search: req}});
        let searchTerm = req.searchParams.query;

        const searchResult = await Question.aggregate([{
            $match: {
                $text: {
                    $search: searchTerm
                }
            },
        }, {
            $lookup: {
                from: 'exams', // Name of the "users" collection
                localField: 'paperId', foreignField: '_id', as: 'exams',
            },
        }, {
            $unwind: '$exams', // Unwind the array created by $lookup
        }, {
            $sort: {
                questionBody: -1, // Sort by the "questionBody" field in descending order (most recent first)
            },
        }, {
            $project: {
                questionBody: 1, // Include answer fields
                questionNumber: 1,
                marks: 1,
                'exams.paperName': 1, // Include user's name
                'exams.PaperCourseId': 1
            },
        },]).exec();
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
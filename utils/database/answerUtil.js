import connectMongo from '../connectMongo';
import Question from '../../models/Question.js';
import Answer from "../../models/Answer";

export async function fetchAnswersbyId(req) {
    console.log("CONNECTING TO MONGO");
    await connectMongo();
    console.log("CONNECTED TO MONGO");

    return await Answer.findById(req).exec();
}

export async function fetchAllAnswers() {
    console.log("CONNECTING TO MONGO");
    await connectMongo();
    console.log("CONNECTED TO MONGO");

    return await Answer.find().exec();
}

export async function fetchAnswersforQuestionbyId(id) {
    console.log(id);
    console.log("CONNECTING TO MONGO");
    await connectMongo();
    console.log("CONNECTED TO MONGO");

    //TODO: Fix Aggregation Pipeline
    const answers = await Answer.aggregate([{
        $match: {
            questionId: id,
        },
    }, {
        $lookup: {
            from: 'users', // Name of the "users" collection
            localField: 'author', foreignField: '_id', as: 'author',
        },
    }, {
        $unwind: '$author', // Unwind the array created by $lookup
    }, {
        $sort: {
            updatedAt: -1, // Sort by the "createdAt" field in descending order (most recent first)
        },
    }, {
        $project: {
            answerBody: 1, // Include answer fields
            updatedAt: 1,
            'author.name': 1, // Include user's name
        },
    },]).exec();

    console.log(answers);
    return answers;
}


export function postAnswer(formData) {
    try {
        let submissionData = {
            author: formData.get('author'), answerBody: formData.get('answerBody')
        };
        const submission = Answer.create(submissionData, (error, newSubmission) => {
            if (error) {
                throw error;
            } else {
                console.log("Comment posted", newSubmission)
            }
        })
    } catch (error) {
        console.error(error);
    }
}


//TRASH, NEED TO REPLACE
export async function addTemp(req, res) {
    try {
        console.log("CONNECTING TO MONGO");
        await connectMongo();
        console.log("CONNECTED TO MONGO");

        console.log('CREATING DOCUMENT');
        const paper = await Question.create(req.body);
        console.log("CREATED DOCUMENT");

        res.json({paper});
    } catch (error) {
        console.log(error);
        res.json({error});
    }
}
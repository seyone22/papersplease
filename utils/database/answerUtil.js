import connectMongo from '../connectMongo';
import Paper from '../../models/Paper.js';
import Answer from "../../models/Answer";

export async function fetchAnswersbyId(req) {
    console.log("CONNECTING TO MONGO");
    await connectMongo();
    console.log("CONNECTED TO MONGO");

    const answer = await Answer.findById(req).exec();

    return answer;
}

export async function fetchAllAnswers() {
    console.log("CONNECTING TO MONGO");
    await connectMongo();
    console.log("CONNECTED TO MONGO");

    const answer = await Answer.find().exec();
    return answer;
}

export async function fetchAnswersforQuestionbyId(_id, qnNo, ptNo) {
    console.log("CONNECTING TO MONGO");
    await connectMongo();
    console.log("CONNECTED TO MONGO");

    const answers = await Answer.find({paperId: _id, questionNumber: qnNo, partNumber: ptNo}).exec();
    return answers;
}


//TRASH, NEED TO REPLACE
export async function addTemp(req, res) {
    try {
        console.log("CONNECTING TO MONGO");
        await connectMongo();
        console.log("CONNECTED TO MONGO");

        console.log('CREATING DOCUMENT');
        const paper = await Paper.create(req.body);
        console.log("CREATED DOCUMENT");

        res.json({paper});
    } catch (error) {
        console.log(error);
        res.json({error});
    }
}
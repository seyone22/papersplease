import {fetchExams, insertExam} from "../../../../utils/database/examUtil";
import {insertQuestion} from "../../../../utils/database/questionUtil";
import mongoose from "mongoose";

export async function POST(req) {
    let body = await req.json();

    const {
        entity,
        examination,
        paperYear,
        paperName,
        paperCourseId,
        time,
        instructions,
        courseYear,
        pdfLocation,
        ...rest
    } = body;
    const examDetails = {
        entity,
        examination,
        paperYear,
        paperName,
        paperCourseId,
        time,
        instructions,
        courseYear,
        pdfLocation
    };
    examDetails._id = new mongoose.Types.ObjectId();
    const {questions} = rest;


    await insertExam(examDetails);
    // TODO: Array processing does not work!
    for (const question of questions) {
        try {
            question.paperId = examDetails._id;
            console.log('TO ENTER', question);
            await insertQuestion(question);
        } catch (error) {
            console.error('ERROR', error);
        }
    }

    return 1;
}

export async function GET(req) {
    return await fetchExams();
}

export async function DELETE(req) {

}
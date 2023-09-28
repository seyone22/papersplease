import {fetchExams, insertExam} from "../../../../utils/database/examUtil";
import {insertQuestion} from "../../../../utils/database/questionUtil";

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
    const {questions} = rest;

    console.log('TESTINGJAJAJAJA', questions);

    await insertExam(examDetails);
    // TODO: Array processing does not work!
    for (const question of questions) {
        await insertQuestion(question);
    }

    return 1;
}

export async function GET(req) {
    return await fetchExams();
}

export async function DELETE(req) {

}
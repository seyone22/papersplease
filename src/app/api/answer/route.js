import {deleteAnswer, insertAnswer} from "../../../../utils/database/answerUtil";

// POST a comment to the database
export async function POST(req) {
    return await insertAnswer(req);
}

// DELETEs answers.
export async function DELETE(req) {
    return await deleteAnswer(req);
}
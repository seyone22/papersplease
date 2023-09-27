import {model, models, Schema} from "mongoose";
import {ObjectId} from "mongodb";

const examSchema = new Schema({
    _id: {
        type: ObjectId
    },
    entity: {
        type: String,
        required: false
    },
    examination: {
        type: String,
        required: false
    },
    paperYear: {
        type: Number,
        required: true
    },
    paperName: {
        type: String,
        required: true
    },
    paperCourseId: {
        type: String,
        required: true
    },
    courseYear: {
        type: String,
        required: true
    },
    courseSemester: {
        type: Number,
        required: false
    },
    time: {
        type: Number,
        required: false
    },
    instructions: {
        type: String,
        required: false
    },
    pdfLocation: {
        type: String,
        required: false
    }
});

const Exam = models.Exam || model('Exam', examSchema);

Exam.schema.set('collection', 'exams'); //Here's where the collection name is set!

export default Exam;

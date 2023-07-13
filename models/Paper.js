import { Schema, model, models } from 'mongoose';
import {ObjectId} from "mongodb";

const questionSchema = new Schema({
    questionNumber: {
        type: Number,
        required: true
    },
    partNumber: {
        type: String,
        required: true
    },
    subPartNumber: {
        type: String
    },
    questionBody: {
        type: String,
        required: true
    },
    attachments: [String],
    marks: {
        type: Number,
        required: true
    }
});

const paperSchema = new Schema({
    _id: {
        type: ObjectId
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
    questions: [questionSchema]
});

const Paper = models.Paper || model('Paper', paperSchema);

Paper.schema.set('collection', 'papers');

export default Paper;

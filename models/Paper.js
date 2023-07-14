import { Schema, model, models } from 'mongoose';
import {ObjectId} from "mongodb";
import {enumToString} from "mongodb/src/utils";

const subpartSchema = new Schema({
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
    },
})

const partSchema = new Schema({
    questionNumber: {
        type: Number,
        required: true
    },
    partNumber: {
        type: String,
        required: true
    },
    questionBody: {
        type: String,
        required: true
    },
    attachments: [String],
    marks: {
        type: Number,
        required: true
    },
    subparts: [subpartSchema]
})

const questionSchema = new Schema({
    questionNumber: {
        type: Number,
        required: true
    },
    parts: [partSchema]
});

const paperSchema = new Schema({
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
    questions: [questionSchema]
});

const Paper = models.Paper || model('Paper', paperSchema);

Paper.schema.set('collection', 'papers');

export default Paper;

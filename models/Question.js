import {model, models, Schema} from 'mongoose';

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

const questionSchema = new Schema({
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
    paperId: {
        type: Schema.Types.ObjectId,
        ref: 'Exam', // Optional: Specify the referenced model
    },
    subparts: [subpartSchema]
}, {
    timestamps: true,
})

questionSchema.index({questionBody: 'text'});

const Question = models.Question || model('Question', questionSchema);

Question.schema.set('collection', 'questions');

export default Question;

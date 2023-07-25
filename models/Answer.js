// Importing the required module
import { Schema, model, models } from 'mongoose';
import { ObjectId } from 'mongodb';

// Creating a new Mongoose schema for the "answers" collection
const answerSchema = new Schema({
  // ObjectId of the question to which this answer belongs
  questionId: {
    type: ObjectId,
    required: true,
  },
  // Year of the paper to which this answer is related
  paperYear: {
    type: Number,
    required: true,
  },
  // Name of the person who provided this answer
  answeredBy: {
    type: String,
    required: true,
  },
  // The actual text of the answer
  answerText: {
    type: String,
    required: true,
  },
  // Date and time when the answer was created (default: current date/time)
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Creating a model named "Answers" from the "answerSchema"
const Answers = models.Answers || model('Answers', answerSchema);

// Specifying the collection name as "answers" for the "Answers" model
Answers.schema.set('collection', 'answers');

// Exporting the "Answers" model to be used in other parts of the application
export default Answers;

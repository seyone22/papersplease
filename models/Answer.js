// Importing the required module
import {model, models, Schema} from 'mongoose';
import {ObjectId} from 'mongodb';

// Creating a new Mongoose schema for the Answers collection
const answerSchema = new Schema({
  _id: {
    type: ObjectId
  },
  // Reference to the Paper schema
  paperId: {
    type: ObjectId,
    ref: 'Paper', // The name of the Paper model to reference
    required: true,
  },
  questionNumber: {
    type: Number,
    required: true
  },
  partNumber: {
    type: String,
    required: true
  },
  // The actual text of the answer
  answerText: {
    type: String,
    required: true,
  },
  // The user who created the answer
  createdBy: {
    type: ObjectId,
    ref: 'User', // The name of the User model to reference
    required: true,
  },
  // Date and time when the answer was created (default: current date/time)
  createdAt: {
    type: Date,
    default: Date.now,
  },
  votePositive: {
    type: Number
  },
  voteNegative: {
    type: Number
  },
  superVotesPositive: {
    type: Number
  },
  superVotesNegative: {
    type: Number
  }
});

// Creating a model named "Answer" from the "answerSchema"
const Answer = models.Answer || model('Answer', answerSchema);

// Exporting the "Answer" model to be used in other parts of the application
export default Answer;
// Importing the required module
import {model, models, Schema} from 'mongoose';
import {ObjectId} from 'mongodb';

// Creating a new Mongoose schema for the Answers collection
const answerSchema = new Schema({
  _id: {
    type: ObjectId
  },
  // Reference to the Question schema
  questionId: {
    type: ObjectId,
    ref: 'Question', // The name of the Question model to reference
    required: true,
  },
  // The actual text of the answer
  answerBody: {
    type: String,
    required: true,
  },
  // The user who created the answer
  author: {
    type: ObjectId,
    ref: 'User', // The name of the User model to reference
    required: true,
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
}, {
  timestamps: true
});

// Creating a model named "Answer" from the "answerSchema"
const Answer = models.Answer || model('Answer', answerSchema);
Answer.schema.set('collection', 'answers'); //Here's where the collection name is set!

// Exporting the "Answer" model to be used in other parts of the application
export default Answer;
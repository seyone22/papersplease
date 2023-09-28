import {ObjectId} from "mongodb";
import mongoose from "mongoose";
import {NextResponse} from "next/server";

import connectMongo from '../connectMongo';
import Answer from "../../models/Answer";

// Fetch answers
export async function fetchAnswersbyId(req) {
    console.log("CONNECTING TO MONGO");
    await connectMongo();
    console.log("CONNECTED TO MONGO");

    return await Answer.findById(req).exec();
}

export async function fetchAllAnswers() {
    console.log("CONNECTING TO MONGO");
    await connectMongo();
    console.log("CONNECTED TO MONGO");

    return await Answer.find().exec();
}

export async function fetchAnswersforQuestionbyId(id) {
    console.log(id);
    console.log("CONNECTING TO MONGO");
    await connectMongo();
    console.log("CONNECTED TO MONGO");

    const answers = await Answer.aggregate([{
        $match: {
            questionId: new ObjectId(id),
        },
    }, {
        $lookup: {
            from: 'users', // Name of the "users" collection
            localField: 'author', foreignField: '_id', as: 'author',
        },
    }, {
        $unwind: '$author', // Unwind the array created by $lookup
    }, {
        $sort: {
            updatedAt: -1, // Sort by the "createdAt" field in descending order (most recent first)
        },
    }, {
        $project: {
            answerBody: 1, // Include answer fields
            updatedAt: 1,
            'author.name': 1, // Include user's name
        },
    },]).exec();

    console.log(answers);
    return answers;
}

// Insert Answers
export async function insertAnswer(req) {
    try {
        console.log("CONNECTING TO MONGO");
        await connectMongo();
        console.log("CONNECTED TO MONGO");

        console.log('CREATING DOCUMENT');
        let newAnswer = await req.json();
        newAnswer._id = new mongoose.Types.ObjectId();
        const answer = await Answer.create(newAnswer);
        console.log("CREATED DOCUMENT");

        console.log(newAnswer);
        return NextResponse.json({newAnswer})

    } catch (error) {
        let message = error.message;
        console.log(error);
        return NextResponse.json({message});
    }
}

// Delete Answers
export async function deleteAnswer(req) {
    try {
        console.log("CONNECTING TO MONGO");
        await connectMongo();
        console.log("CONNECTED TO MONGO");

        const answerId = req.nextUrl.searchParams.get("_id"); // Assuming you are passing the exam ID in the URL
        const deletedAnswer = await Answer.findByIdAndDelete(new mongoose.Types.ObjectId(answerId));

        if (!deletedAnswer) {
            throw new Error("Answer not found");
        }

        console.log("DELETED ANSWER");
        return NextResponse.json({deletedAnswer});

    } catch (error) {
        let message = error.message;
        console.log(error);
        return NextResponse.json({message});
    }
}
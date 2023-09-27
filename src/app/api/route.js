import {NextResponse} from 'next/server'
import connectMongo from "../../../utils/connectMongo";
import Question from "../../../models/Question";
import mongoose from "mongoose";

import {fetchPapers} from '../../../utils/database/examUtil'
import Answer from "../../../models/Answer";

export async function POST(req) {

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
        return NextResponse.json({ message });
    }
}

export async function GET(req) {
    console.log(req.json());
    try {
        console.log('SEARCHING...');
        const documents = await fetchPapers();
        console.log("FOUND DOCUMENT!");

        return NextResponse.json({documents})
    } catch (error) {
        let message = error.message;
        console.log(error);
        return NextResponse.json({message});
    }
}

export async function PUT(req) {
    try {
        console.log("CONNECTING TO MONGO");
        await connectMongo();
        console.log("CONNECTED TO MONGO");

        console.log('UPDATING PAPER');

        const paperId = req.nextUrl.searchParams.get("id"); // Assuming you are passing the paper ID in the URL
        let updatedPaper = await req.json();

        // Validate that updatedPaper has some data before proceeding with the update
        if (!updatedPaper || Object.keys(updatedPaper).length === 0) {
            throw new Error("Invalid request data");
        }

        // Update the paper with the new data
        const paper = await Question.findByIdAndUpdate(paperId, updatedPaper, {new: true});

        if (!paper) {
            throw new Error("Question not found");
        }

        console.log("UPDATED PAPER");

        return NextResponse.json({ updatedPaper });

    } catch (error) {
        let message = error.message;
        console.log(error);
        return NextResponse.json({ message });
    }
}

export async function DELETE(req) {
    try {
        console.log("CONNECTING TO MONGO");
        await connectMongo();
        console.log("CONNECTED TO MONGO");

        const answerId = req.nextUrl.searchParams.get("_id"); // Assuming you are passing the paper ID in the URL
        const deletedAnswer = await Answer.findByIdAndDelete(new mongoose.Types.ObjectId(answerId));

        if (!deletedAnswer) {
            throw new Error("Answer not found");
        }

        console.log("DELETED ANSWER");
        return NextResponse.json({deletedAnswer});

    } catch (error) {
        let message = error.message;
        console.log(error);
        return NextResponse.json({ message });
    }
}
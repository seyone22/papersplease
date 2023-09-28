import {NextResponse} from 'next/server'
import mongoose from "mongoose";

import connectMongo from "../../../../utils/connectMongo";
import Answer from "../../../../models/Answer";

// POST a comment to the database
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
        return NextResponse.json({message});
    }
}

// DELETEs answers.
export async function DELETE(req) {
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
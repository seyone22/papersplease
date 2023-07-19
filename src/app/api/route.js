import { NextResponse } from 'next/server'
import connectMongo from "../../../utils/connectMongo";
import Paper from "../../../models/Paper";
import { ObjectId } from 'mongodb';
import mongoose from "mongoose";

import { fetchPapers } from 'utils/database'

export async function POST(req) {

    try {
        console.log("CONNECTING TO MONGO");
        await connectMongo();
        console.log("CONNECTED TO MONGO");

        console.log('CREATING DOCUMENT');
        let newPaper = await req.json();
        const paper = await Paper.create(newPaper);
        console.log("CREATED DOCUMENT");

        console.log(newPaper);
        return NextResponse.json({ newPaper })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error });
    }


}

export async function GET(req) {
    console.log(req.json());
    if (false) {
        try {
            console.log('SEARCHING...');
            const documents = await fetchPapers();
            console.log("FOUND DOCUMENT!");

            return NextResponse.json({documents})
        } catch (error) {
            console.log(error);
            return NextResponse.json({error});
        }
    } else {
        try {
            console.log('SEARCHING...');
            const documents = await fetchPapers();
            console.log("FOUND DOCUMENT!");

            return NextResponse.json({documents})
        } catch (error) {
            console.log(error);
            return NextResponse.json({error});
        }
    }
}

export async function PUT(req) {
    try {
        console.log("CONNECTING TO MONGO");
        await connectMongo();
        console.log("CONNECTED TO MONGO");

        console.log('UPDATING PAPER');

        const paperId = req.params.id; // Assuming you are passing the paper ID in the URL
        let updatedPaper = await req.json();

        // Validate that updatedPaper has some data before proceeding with the update
        if (!updatedPaper || Object.keys(updatedPaper).length === 0) {
            throw new Error("Invalid request data");
        }

        // Update the paper with the new data
        const paper = await Paper.findByIdAndUpdate(paperId, updatedPaper, { new: true });

        if (!paper) {
            throw new Error("Paper not found");
        }

        console.log("UPDATED PAPER");

        return NextResponse.json({ updatedPaper });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error });
    }
}

export async function DELETE(req) {
    try {
        console.log("CONNECTING TO MONGO");
        await connectMongo();
        console.log("CONNECTED TO MONGO");

        const paperId = await req.nextUrl.searchParams.get("id"); // Assuming you are passing the paper ID in the URL
        const deletedPaper = await Paper.findByIdAndDelete(new mongoose.Types.ObjectId(paperId));

        if (!deletedPaper) {
            throw new Error("Paper not found");
        }

        console.log("DELETED PAPER");

        return NextResponse.json({ deletedPaper });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error });
    }
}
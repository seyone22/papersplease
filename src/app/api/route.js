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
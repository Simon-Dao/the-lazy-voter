import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET(request: Request) {
    
    const { searchParams } = new URL(request.url);
    const prompt = searchParams.get('prompt');

    if(!prompt) {
        return NextResponse.json({ error: 'Candidate not found' }, { status: 404 });
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || "");

    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(prompt);
    const message = await result.response.text();

    return NextResponse.json(
        { message },
        { status: 200 }
    );
}

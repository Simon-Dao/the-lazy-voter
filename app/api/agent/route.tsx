import OpenAI from "openai";
import { NextResponse } from "next/server";

const openAIClient = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });

export async function GET(request: Request) {
    
    const { searchParams } = new URL(request.url);
    const prompt = searchParams.get('prompt');

    if(!prompt) {
        return NextResponse.json({ error: 'Candidate not found' }, { status: 404 });
    }

    const openAIResponse = await openAIClient.responses.create({
        model: "gpt-4.1-nano",
        input: prompt,
    });

    return NextResponse.json(
        { message: openAIResponse.output_text },
        { status: 200 }
    );
}

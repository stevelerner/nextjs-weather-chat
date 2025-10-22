import { OpenAI } from "openai";
import { NextRequest, NextResponse } from "next/server";

/**
 * Initialize OpenAI client with API key from environment variables.
 * The API key should be stored in .env.local as OPENAI_API_KEY.
 */
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * POST /api/chat
 * 
 * Handles chat requests to OpenAI's API with weather-focused responses.
 * This endpoint processes user messages and returns AI-generated responses
 * that are restricted to weather-related topics only.
 * 
 * @param req - Next.js request object
 * @returns JSON response containing the AI's message or error details
 * 
 * Request body format:
 * {
 *   messages: Array<{ role: "user" | "assistant", content: string }>
 * }
 * 
 * Response format (success):
 * {
 *   message: string
 * }
 * 
 * Response format (error):
 * {
 *   error: string
 * }
 */
export async function POST(req: NextRequest) {
  try {
    // Parse the incoming request body to extract the messages array
    const { messages } = await req.json();

    // Validate that messages exist and is an array
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    /**
     * System prompt that constrains the AI to weather-related responses.
     * This ensures the chatbot stays focused on its intended purpose
     * and politely redirects off-topic questions.
     */
    const systemMessage = {
      role: "system" as const,
      content: `You are a helpful weather assistant. You should ONLY answer questions related to weather, meteorology, climate, forecasts, and atmospheric conditions. 

If a user asks about topics unrelated to weather, politely redirect them by saying something like: "I'm specialized in weather-related questions. Please ask me about weather, forecasts, climate, or atmospheric conditions!"

You can discuss:
- Weather forecasts and current conditions
- Climate patterns and phenomena
- Meteorological concepts
- Weather-related safety tips
- Seasonal weather patterns
- Historical weather events

Keep your responses concise and helpful.`
    };

    /**
     * Call OpenAI's chat completion API with:
     * - gpt-4o-mini: A fast, cost-effective model suitable for chat
     * - systemMessage: Prepended to enforce weather-only responses
     * - messages: The conversation history from the client
     * - stream: false to get the complete response at once
     */
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [systemMessage, ...messages],
      stream: false,
    });

    // Return the AI's response message to the client
    return NextResponse.json({
      message: completion.choices[0].message.content,
    });
  } catch (error: any) {
    // Log the error for debugging purposes
    console.error("OpenAI API error:", error);
    
    /**
     * Return a 500 error response if the OpenAI API call fails.
     * Common errors include:
     * - 429: Rate limit or quota exceeded
     * - 401: Invalid API key
     * - 500: OpenAI service issues
     */
    return NextResponse.json(
      { error: error?.message || "Failed to process chat request" },
      { status: 500 }
    );
  }
}


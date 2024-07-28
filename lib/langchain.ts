import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import {
  ChatPromptTemplate,
  FewShotChatMessagePromptTemplate,
} from "@langchain/core/prompts";

const model = new ChatGoogleGenerativeAI({
  apiKey: `${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`,
  temperature: 0.7,
  model: "gemini-1.5-flash",
  maxOutputTokens: 8192,
  topK: 64,
  topP: 0.95,
});

export const getDynamicMusicMood = async (prompt: string) => {
  try {
    const res = await model.invoke([["human", `${prompt}`]]);
    return res.content as string;
  } catch (error) {
    console.log("something went wrong:", error);
  }
};


import { GoogleGenerativeAI } from "@google/generative-ai";
import { FunctionDeclarationSchemaType} from '@google/generative-ai' ;

import dotenv from "dotenv"
dotenv.config();

const apiKey=process.env.API_KEY
const genAI = new GoogleGenerativeAI(apiKey);

// for paraphrasaing

let model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: {
      type: FunctionDeclarationSchemaType.ARRAY,
      items: {
        type: FunctionDeclarationSchemaType.OBJECT,
        properties: {
          paraphrased:{
            type: FunctionDeclarationSchemaType.STRING,
          },
        },
      },
    },
  }
});


async function runParaphrase(prompt){
  const result = await model.generateContent(prompt)
  const response=result.response;
  return response.text(); 
}

export default runParaphrase;
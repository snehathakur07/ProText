
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FunctionDeclarationSchemaType} from '@google/generative-ai' ;

import dotenv from "dotenv"
dotenv.config();

const apiKey=process.env.API_KEY
const genAI = new GoogleGenerativeAI(apiKey);

//for summary
let model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: {
      type: FunctionDeclarationSchemaType.ARRAY,
      items: {
        type: FunctionDeclarationSchemaType.OBJECT,
        properties: {
          title: {
            type: FunctionDeclarationSchemaType.STRING,
          },
          summary:{
            type: FunctionDeclarationSchemaType.STRING,
          },
        },
      },
    },
  }
});


async function runSummary(prompt){
  const result = await model.generateContent(prompt)
  const response=result.response;
  return response.text(); 
}
export default runSummary;
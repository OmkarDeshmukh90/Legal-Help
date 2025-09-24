import { GoogleGenAI, Type } from "@google/genai";
import { type ClassificationResultData } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const classificationSchema = {
  type: Type.OBJECT,
  properties: {
    classification: {
      type: Type.STRING,
      description: 'The primary area of law for this case under the new legal framework (e.g., "Criminal Law (BNS)", "Offences Against the Person").',
    },
    justification: {
      type: Type.STRING,
      description: 'A concise, 1-2 sentence justification for the classification, explaining the key reasons based on the case description within the context of the Bharatiya Nyaya Sanhita.',
    },
    key_concepts: {
      type: Type.ARRAY,
      description: 'A list of 3-5 key legal concepts or doctrines relevant to the case under the new Indian laws.',
      items: {
        type: Type.STRING,
      },
    },
    relevant_acts_sections: {
        type: Type.ARRAY,
        description: 'A list of relevant Sections from the Bharatiya Nyaya Sanhita (BNS), Bharatiya Nagarik Suraksha Sanhita (BNSS), or Bharatiya Sakshya Adhiniyam (BSA) (e.g., "BNS Section 101", "BNS Section 315").',
        items: {
            type: Type.STRING
        }
    }
  },
  required: ["classification", "justification", "key_concepts", "relevant_acts_sections"],
};

export const classifyCase = async (description: string): Promise<ClassificationResultData> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze the following legal case description and classify it according to the Bharatiya Nyaya Sanhita (BNS) and related new laws: "${description}"`,
      config: {
        systemInstruction: "You are a highly skilled legal assistant AI specializing in India's new criminal laws. Your task is to analyze a legal case description and classify it. Provide a clear classification, a concise justification, list key legal concepts, and cite relevant sections from the Bharatiya Nyaya Sanhita (BNS), Bharatiya Nagarik Suraksha Sanhita (BNSS), and Bharatiya Sakshya Adhiniyam (BSA). Respond only with the JSON object as defined in the schema.",
        responseMimeType: "application/json",
        responseSchema: classificationSchema,
        temperature: 0.2,
      },
    });

    const jsonText = response.text.trim();
    if (!jsonText) {
      throw new Error("The API returned an empty response. Please try again.");
    }
    
    const cleanedJsonText = jsonText.replace(/^```json\n?/, '').replace(/\n?```$/, '');

    const parsedResult = JSON.parse(cleanedJsonText);
    
    if (!parsedResult.classification || !parsedResult.justification || !Array.isArray(parsedResult.key_concepts) || !Array.isArray(parsedResult.relevant_acts_sections)) {
        throw new Error("Received malformed data from the API.");
    }

    return parsedResult as ClassificationResultData;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to communicate with the AI model. Please check your connection or API key and try again.");
  }
};
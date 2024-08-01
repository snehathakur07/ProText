import runMeanings from "../gemini/toolkit/gemini-word-meaning.js"
import wordSchema from "../models/wordMeanings.js"

export const generateWordMeaning = async (req, res) => {
    const wordToSearch = req.body.word;
    const prompt = `Give the detailed meaning of the word or phrase: "${wordToSearch}". Provide the following information in the exact JSON format below:

    1. The word or phrase (with proper capitalization).
    2. A brief and clear definition of the word or phrase.
    3. Exactly 5 synonyms of the word or phrase.(synonyms can be phrases that have the same meaning as "${wordToSearch}")
    4. Exactly 5 antonyms of the word or phrase.(synonyms can be phrases that have the opposite meaning as "${wordToSearch}")
    5. An example sentence that illustrates the use of the word or phrase.

    Ensure that the response is formatted as follows:
    [{
    "word": "Word or Phrase",
    "meaning": "Definition",
    "synonyms": ["synonym1", "synonym2", "synonym3", "synonym4", "synonym5"],
    "antonyms": ["antonym1", "antonym2", "antonym3", "antonym4", "antonym5"],
    "example": "Example sentence."
}] `;
    console.log(prompt)
    try {
        const response = await runMeanings(prompt); //--->raw response
        const parsedResponse = JSON.parse(response) //--->parsed response
        // console.log(response)
        console.log(parsedResponse)
        // console.log(parsedResponse.length)
        if (parsedResponse.length===1) {
            const word = parsedResponse[0].word;
            const meaning = parsedResponse[0].meaning;
            const synonyms = parsedResponse[0].synonyms;
            const antonyms = parsedResponse[0].antonyms;
            const example = parsedResponse[0].example;

            const newWord = wordSchema({
                word: word,
                meaning: meaning,
                synonyms: synonyms,
                antonyms: antonyms,
                example: example,
            })
            console.log(newWord)
            await newWord.save();
            res.status(200).json(newWord);
        }
        else if (parsedResponse.length===5) {
            const word = parsedResponse[0].word;
            const meaning = parsedResponse[1].meaning;
            const synonyms = parsedResponse[2].synonyms;
            const antonyms = parsedResponse[3].antonyms;
            const example = parsedResponse[4].example;

            const newWord = wordSchema({
                word: word,
                meaning: meaning,
                synonyms: synonyms,
                antonyms: antonyms,
                example: example,
            })
            console.log(newWord)
            await newWord.save();
            res.status(200).json(newWord);
        }
        else {
            res.status(400).json({ success: false, error: 'Empty or invalid response from AI model.' });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

export const getAllWords = async (req, res) => {
    try {
        const words = await wordSchema.find().sort({ createdAt: -1 });
        res.status(200).json(words);
    }
    catch (error) {
        res.status(500).json({ message: "Server error fetching words" });
    }
}

export const getWord = async (req, res) => {
    try {
        // console.log(req.params.id)
        const word = await wordSchema.findById(req.params.id);
        res.status(200).json(word);
    }
    catch (error) {
        res.status(500).json({ message: "Server error fetching word" });
    }
}
export const deleteWord = async (req, res) => {
    try {
        const word = await wordSchema.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Word Deleted !" });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}
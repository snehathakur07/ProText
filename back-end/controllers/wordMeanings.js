import runMeanings from "../gemini/toolkit/gemini-word-meaning.js"
import wordSchema from "../models/wordMeanings.js"

export const generateWordMeaning = async (req, res) => {
    const wordToSearch = req.body.word;
    const prompt = `Give the meaning of the word/phrase: "${wordToSearch}". Return the word(capitalize accordingly), meaning, exactly 5 synonyms, exactly 5 antonyms, and an example sentence. Give response only in the provided JSON format.
    
    `;
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
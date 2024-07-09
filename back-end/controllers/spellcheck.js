import runSpellCheck from "../gemini/toolkit/gemini-spellcheck.js"

export const Spellcheck = async (req, res) => {
    const text = req.body.text;
    const prompt = `Run a spell check on the following text and return it with corrected spellings. If there are no spelling mistakes, return as it is. Also capitalize the first letter of the sentence. :\n ${text}`;
    console.log(prompt)
    try {
        const response = await runSpellCheck(prompt); //--->raw response
        const parsedResponse = JSON.parse(response) //--->parsed response
        console.log(parsedResponse)
        if (parsedResponse && parsedResponse.length >= 1) {

            const corrected = parsedResponse[0].corrected;
            
            res.status(200).json(corrected);
        }
        else {
            res.status(400).json({ success: false, error: 'Empty or invalid response from AI model.' });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

import runSpellCheck from "../gemini/toolkit/gemini-spellcheck.js"

export const Spellcheck = async (req, res) => {
    const text = req.body.text;
    const prompt = `Please perform a spell check on the following text and return it with all spelling errors corrected. If there are no spelling mistakes, return the text unchanged. Additionally, ensure proper capitalizations. The formatting, including spacing, highlights, bold phrases, etc., should be preserved. 

    The text to be checked is as follows: \n${text}.
    `
    console.log(prompt)
    try {
        const response = await runSpellCheck(prompt); 
        const parsedResponse = JSON.parse(response) 
        console.log(parsedResponse)
        if (parsedResponse) {

            const corrected = parsedResponse[0].corrected;
            console.log(corrected)
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

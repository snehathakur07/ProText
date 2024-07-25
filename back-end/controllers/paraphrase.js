import runParaphrase from "../gemini/toolkit/gemini-paraphrase.js"

export const generateParaphrase = async (req, res) => {
    const text = req.body.text;
    const mode=req.body.mode;
    const prompt = `Paraphrase the following text with mode : ${mode}.\n Also provide a suitable title.
    Ensure that the title is included separately in the JSON response and does not exceed 100 characters. The title should not be included within the paraphrased response itself. 
    Text: ${text}
    `;
    console.log(prompt)
    try {
        const response = await runParaphrase(prompt); //--->raw response
        const parsedResponse = JSON.parse(response) //--->parsed response
        console.log(parsedResponse)
        if (parsedResponse ) {

            const title = parsedResponse[0].title;
            const paraphrased = parsedResponse[0].paraphrased;
            
            const final={
                title:title,
                paraphrased:paraphrased
            }
            res.status(200).json(final);
        }
        else {
            res.status(400).json({ success: false, error: 'Empty or invalid response from AI model.' });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

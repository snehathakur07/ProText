import runParaphrase from "../gemini/toolkit/gemini-paraphrase.js"

export const generateParaphrase = async (req, res) => {
    const text = req.body.text;
    const mode=req.body.mode;
    const prompt = `Paraphrase the following text with mode : ${mode}. \n ${text}`;
    console.log(prompt)
    try {
        const response = await runParaphrase(prompt); //--->raw response
        const parsedResponse = JSON.parse(response) //--->parsed response
        console.log(parsedResponse)
        if (parsedResponse && parsedResponse.length >= 1) {

            const paraphrased = parsedResponse[0].paraphrased;
            
            res.status(200).json(paraphrased);
        }
        else {
            res.status(400).json({ success: false, error: 'Empty or invalid response from AI model.' });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

import runGrammarStyleChecks from "../gemini/toolkit/gemini-grammar-style.js"

export const improveGrammarandStyle = async (req, res) => {
    const text = req.body.text;
    const prompt = `Perform a grammar and style check on the following text. Provide concise suggestions to improve clarity, coherence, and adherence to grammatical rules and to improve the overall tone of the text. Provide suggestions like you're talking to the user. Be short with the suggestions. If there are grammatical errors, don't suggest the replacement for each and evry mistake, just say that there are a few grammatical errors and they could be improved. Don't include example in the suggestions, return it separately. Also provide an example which incorporates those suggestions into the given text:\n${text}`;


    console.log(prompt)
    try {
        const response = await runGrammarStyleChecks(prompt); //--->raw response
        const parsedResponse = JSON.parse(response) //--->parsed response
        console.log(parsedResponse)
        if (parsedResponse && parsedResponse.length >= 2) {

            const suggestions = parsedResponse[0].suggestions;
            const example = parsedResponse[1].example;
            const result={
                suggestions,
                example
            }
            res.status(200).json(result);
        }
        else {
            res.status(400).json({ success: false, error: 'Empty or invalid response from AI model.' });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

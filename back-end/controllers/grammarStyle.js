import runGrammarStyleChecks from "../gemini/toolkit/gemini-grammar-style.js"

export const improveGrammarandStyle = async (req, res) => {
    const text = req.body.text;
    const prompt = `Perform a grammar and style check on the following text. Provide concise suggestions for each and every grammatical mistake and improvement in clarity, coherence, and overall tone. Present your suggestions in bullet points, and provide them as if you are directly communicating with the user. Be brief but specific with each suggestion. For grammatical errors, point out each mistake and offer a specific suggestion for correction. For style or tone improvements, suggest specific changes to enhance the text.
    Include an example that incorporates all of your suggestions into the given text. Don't include any title, neither in suggestions nor in example. Don't even say this "Grammar and Style Suggestions:"
    The formatting, including spacing, highlights, bold phrases, etc., should be preserved. Provide suggestions regarding formatting as well.
    Ensure that the example is not included in the suggestions.
    Text: \n${text}`;


    console.log(prompt)
    try {
        const response = await runGrammarStyleChecks(prompt); //--->raw response
        const parsedResponse = JSON.parse(response) //--->parsed response
        console.log(parsedResponse)
        if (parsedResponse) {
            console.log("inside if")
            const suggestions = parsedResponse[0].suggestions;
            const example = parsedResponse[0].example;
            const result={
                suggestions,
                example
            }
            console.log("bro")
            console.log(result)
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

import runGrammarStyleChecks from "../gemini/toolkit/gemini-grammar-style.js"

export const improveGrammarandStyle = async (req, res) => {
    const text = req.body.text;
    const prompt = `Perform a detailed grammar and style check on the following text. For each grammatical error, provide a concise explanation of the mistake and a specific suggestion for correction. For improvements in clarity, coherence, and overall tone, offer specific recommendations to enhance the text.

Present your suggestions in the form of a list, making them clear and direct. Include any necessary corrections or enhancements to the text's formatting, spacing, and highlights.

Additionally, provide an example of the revised text that incorporates all your suggestions. Do not include a title or any introductory phrases such as "Grammar and Style Suggestions:" in either the suggestions or the example.

Ensure that the example is separate from the suggestions and that both suggestions and the example are included in the response.

Text: \n${text}
`;


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

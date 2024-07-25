import run from "../gemini/creative-writing/gemini-quote-caption.js"

export const generate = (type) => async (req, res) => {
    const context = req.body.context
    let prompt;
    if (type === 'Caption') {
        prompt = `Generate a caption for my post on social media. Context: ${context}`;
    }
    else {
        prompt = `Generate a quote. Context: ${context}`;
    }
    console.log(prompt)
    try {
        const response = await run(prompt); //--->raw response
        const parsedResponse = JSON.parse(response) //--->parsed response
        console.log(parsedResponse)
        if (parsedResponse && parsedResponse.length >= 1) {
            const quote = parsedResponse[0].content;
            res.status(200).json(quote);
        }
        else {
            res.status(400).json({ success: false, error: 'Empty or invalid response from AI model.' });
        }
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}


import contentSchema from "../models/creative-content.js"
import runContentGeneration from "../gemini/creative-writing/gemini-creative-writing.js"

export const generateWriting = async (req, res) => {
    const context = req.body.context;
    const category = req.body.category;
    let prompt
    if (category === 'Article' || category === 'Essay') {
        const wordCount = parseInt(req.body.wordLimit);
        prompt = `I want an ${category} on ${context} in around ${wordCount} words and also provide a suitable title for it. Title must not exceed 100 characters.`;
    }
    else if (category === 'Debate') {
        const motion = req.body.motion;
        const wordCount = parseInt(req.body.wordLimit);
        let debateType;
        if (motion === 'for') {
            debateType = 'supporting';
        } else if (motion === 'against') {
            debateType = 'opposing';
        }
        prompt = `I want a debate ${debateType} ${context} in around ${wordCount} words and also provide a suitable title for it. Title must not exceed 100 characters.`;
    }
    else {
        const genre = req.body.genre;
        if (category === 'Play') {
            const wordCount = parseInt(req.body.wordLimit);
            prompt = `I want a play/skit. Context: "${context}" \nin around ${wordCount} words and also provide a suitable title for it. Title must not exceed 100 characters. Specified Genre: ${genre}. Provide a proper introduction, dialogues and proper narration in between the scenes.`;
        }
        else {
            if (category === 'Poem') {
                prompt = `I want a ${category} about ${context} and also provide a suitable title for it. Title must not exceed 100 characters. Specified Genre: ${genre}`;
            }
            else {
                const wordCount = parseInt(req.body.wordLimit);
                prompt = `I want a ${category} about ${context} in around ${wordCount} words and also provide a suitable title for it. Title must not exceed 100 characters. Specified Genre: ${genre}`;
            }
        }
    }

    console.log(prompt)
    try {
        const response = await runContentGeneration(prompt); //--->raw response
        const parsedResponse = JSON.parse(response) //--->parsed response
        if (parsedResponse && parsedResponse.length >= 2) {

            const title = parsedResponse[0].title;
            const content = parsedResponse[1].content;

            const newContent = contentSchema({
                title: title,
                content: content,
                category:category
            });
            await newContent.save();
            res.status(200).json(newContent);
        }
        else {
            res.status(400).json({ success: false, error: 'Empty or invalid response from AI model.' });
        }
    }
    catch (error) {
        console.error('Error generating or saving writing:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

export const getAllWritings = async (req, res) => {
    try {
        const Writings = await contentSchema.find().sort({ createdAt: -1 });
        res.status(200).json(Writings);
    }
    catch (error) {
        res.status(500).json({ message: "Server error fetching Writings" });
    }
}

export const getWriting = async (req, res) => {
    try {
        // console.log(req.params.id)
        const writing = await contentSchema.findById(req.params.id);
        res.status(200).json(writing);
    }
    catch (error) {
        res.status(500).json({ message: "Server error fetching Writings" });
    }
}

export const updateWriting = async (req, res) => {
    try {
        const writing = await contentSchema.findById(req.params.id);
        writing.title = req.body.title;
        await writing.save();
        res.status(200).json({ message: "Writing Updated !" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}

export const deleteWriting = async (req, res) => {
    try {
        const writing = await contentSchema.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Writing Deleted !" });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}
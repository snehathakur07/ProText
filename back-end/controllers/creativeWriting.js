import contentSchema from "../models/creative-content.js"
import runContentGeneration from "../gemini/creative-writing/gemini-creative-writing.js"

export const generateWriting = async (req, res) => {

    const context = req.body.context;
    const category = req.body.category;
    let prompt;
    console.log(context, category)
    if (category === 'Article' || category === 'Essay') {
        const wordCount = parseInt(req.body.wordLimit);
        prompt = `I want an ${category} on ${context} in ${wordCount} words (word count is important) and also provide a suitable title for it. Title must not exceed 100 characters. Consider breaking it down into sections or subtopics for better organization and readability.`;
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
        prompt = `I want a debate ${debateType} ${context} in ${wordCount} words (word count is important)and also provide a suitable title for it. Title must not exceed 100 characters. Consider breaking it down into sections or subtopics for better organization and readability.`;
    }
    else {
        const genre = req.body.genre;
        if (category === 'Play') {
            // const wordCount = parseInt(req.body.wordLimit);
            prompt = `I want a play/skit. Context: "${context}" .\n also provide a suitable title for it. Title must not exceed 100 characters. Specified Genre: ${genre}. Provide a proper introduction, dialogues and proper narration in between the scenes.
            It should be a complete story narration. Don't leave the story in the middle.`;
        }
        else {
            if (category === 'Poem') {
                prompt = `I want a ${category}. Context: ${context} \n Also provide a suitable title for it. Title must not exceed 100 characters. Specified Genre: ${genre}\n Give a proper formatted version of the poem. Should be properly indented.\nDon't make the poem too short or too long.\n`;
            }
            else {
                const wordCount = parseInt(req.body.wordLimit);
                prompt = `Please write a ${category} with the following details:
                - Context: ${context}
                - Word Count: at least or around ${wordCount} words (strict limit)
                - Genre: ${genre}
                Additionally, provide a title (within 100 characters) that captures the essence of the content. Make sure the tone aligns with the specified genre.
                If the word limit is too low for it to be a story, adjust accordingly.
                Must be properly formatted and indented. Use paragraphs wherever possible.`;
            }
        }
    }
    prompt = prompt + "\n Do not include the main title in the content itself, start content without the title. And complete the content. Don't leave it hanging."
    console.log(prompt)
    try {
        const response = await runContentGeneration(prompt); //--->raw response
        const parsedResponse = JSON.parse(response) //--->parsed response
        console.log(parsedResponse)
        if (parsedResponse) {
            let title, content
            if (parsedResponse.length === 1) {

                title = parsedResponse[0].title;
                content = parsedResponse[0].content;
            }
            else {
                content = parsedResponse[0].content
                title = parsedResponse[1].title
            }
            const newContent = contentSchema({
                title: title,
                content: content,
                category: category
            });
            console.log(newContent)
            // await newContent.save();
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
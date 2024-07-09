import summarySchema from "../models/summary.js"
import runSummary from "../gemini/toolkit/gemini-summary.js"

export const generateSummary = async (req, res) => {
    const text = req.body.text;
    const wordCount = parseInt(req.body.count);
    const prompt = `I want the summary of the following text in around ${wordCount} words and also provide a suitable title for this text. Title must not exceed 50 characters.: \n${text}`;
    console.log(prompt)
    try {
        const response = await runSummary(prompt); //--->raw response
        const parsedResponse = JSON.parse(response) //--->parsed response
        if (parsedResponse && parsedResponse.length >= 2) {

            const title = parsedResponse[0].title;
            const summary = parsedResponse[1].summary;
            
            const newSummary = summarySchema({
                title: title,
                summary: summary
            });
            await newSummary.save();
            res.status(200).json(newSummary);
        }
        else {
            res.status(400).json({ success: false, error: 'Empty or invalid response from AI model.' });
        }
    }
    catch (error) {
        console.error('Error generating or saving summary:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
}

export const getAllSummaries = async (req,res)=>{
    try{
        const summaries = await summarySchema.find().sort({createdAt:-1});
        res.status(200).json(summaries);
    }
    catch(error){
        res.status(500).json({message:"Server error fetching summaries"});
    }
}

export const getSummary= async(req,res)=>{
    try{
        // console.log(req.params.id)
        const summary = await summarySchema.findById(req.params.id);
        res.status(200).json(summary);
    }
    catch(error){
        res.status(500).json({message:"Server error fetching summary"});
    }
}

export const updateSummary =async(req,res)=>{
    try{
        const summary=await summarySchema.findById(req.params.id);
        summary.title=req.body.title;
        await summary.save();
        res.status(200).json({message:"Summary Updated !"});
    }
    catch(error){
        res.status(500).json({message:"Server error"});
    }
}

export const deleteSummary=async(req,res)=>{
    try{
        const summary =await summarySchema.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Summary Deleted !"});
    }
    catch(error){
        res.status(500).json({message:"Server Error"});
    }
}
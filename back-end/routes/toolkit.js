import express from "express"
import {generateSummary,getAllSummaries,getSummary,updateSummary,deleteSummary} from "../controllers/summary.js"
import {generateParaphrase} from "../controllers/paraphrase.js"
import {Spellcheck} from "../controllers/spellcheck.js"
import {improveGrammarandStyle} from "../controllers/grammarStyle.js"
import {generateWordMeaning,getAllWords, getWord, deleteWord} from "../controllers/wordMeanings.js"

const router=express.Router();


router.post('/summary', generateSummary)
    .get('/summary',getAllSummaries)
    .get('/summary/:id', getSummary)
    .patch('/summary/:id', updateSummary)
    .delete('/summary/:id', deleteSummary)


    .post('/paraphrase', generateParaphrase)
    
    .post('/spellcheck', Spellcheck)

    .post('/grammar-style', improveGrammarandStyle)

    .post('/word-meaning',generateWordMeaning)
    .get('/word-meaning',getAllWords)
    .get('/word-meaning/:id', getWord)
    .delete('/word-meaning/:id', deleteWord)
    
export default router;
import express from "express"
import {generateWriting,getAllWritings,getWriting,updateWriting,deleteWriting } from "../controllers/creativeWriting.js"

const router=express.Router();


router .post('/', generateWriting )
    .get('/', getAllWritings )
    .get('/:id', getWriting )
    .patch('/:id', updateWriting )
    .delete('/:id', deleteWriting )
export default router;
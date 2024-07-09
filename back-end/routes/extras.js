import express from "express"
import { generate} from "../controllers/extras.js"

const router=express.Router();


router .post('/caption', generate("caption") )
       .post('/quote', generate("quote") )
export default router;
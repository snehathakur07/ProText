import React, { useEffect, useRef } from 'react'

import Filler from "../../Template/Filler"
import { assets } from "../../../asset/asset"
import { useGlobalContext } from '../../../Context/GlobalContext';
import '../../Template/template.css'
import '../../Template/Prompt.css'
import Top from '../../top'

export default function Paraphraser() {
    const { paraphrasePrompt, setParaphrasePrompt, addParaphrase, paraphraseResponse, formatText, loading } = useGlobalContext();
    const textareaRef = useRef(null);
    const handleTextChange = (event) => {
        console.log("before " + paraphrasePrompt.text)
        setParaphrasePrompt({ ...paraphrasePrompt, text: event.target.value });
        console.log("after " + paraphrasePrompt.text)
        autoResizeTextarea();
    };

    const autoResizeTextarea = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px'; // Set a maximum height limit
            textarea.style.overflowY = textarea.scrollHeight > 200 ? 'scroll' : 'hidden'; // Enable scroll if content exceeds the limit
        }
    };
    
    const handlemodeChange = (event) => {
        setParaphrasePrompt({ ...paraphrasePrompt, mode: event.target.value });
        console.log(paraphrasePrompt.mode)
    };
    const handleSend = async () => {
        await addParaphrase(paraphrasePrompt);
        
        resetTextareaHeight();
    };
    const resetTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.overflowY = 'hidden';
        }
    };

    useEffect(() => {
        autoResizeTextarea();
    }, [paraphrasePrompt.text]);


    const { send_icon } = assets;

    return (
        <div className='main tools'>
            <div className="summarizer">
                <div className="summarizer-con">
                    <Top/>
                    <div className="upper-summ">
                        <div className="title-summ"><h1>Paraphraser </h1></div>
                        <div className="sub-title-summ"><h3>Elevate Your Writing Instantly</h3></div>
                    </div>
                    <div className="inner-summ">
                        <div className="display">
                            {loading === true ? "hello"
                                :

                                paraphraseResponse.title === "" ?
                                    <Filler text="Transform your text effortlessly—choose a mode and let the magic happen!" />
                                    :
                                    <div className="response">
                                        <div><h3>{paraphraseResponse.title}</h3></div>
                                        <p> <div className="summary-content" dangerouslySetInnerHTML={{ __html: formatText(paraphraseResponse.paraphrased) }} /></p>
                                    </div>

                            }
                        </div>
                        <div className="Prompt">

                            <div className="prompt">
                                <div className="bar">
                                <textarea
                                        id="text-input"
                                        placeholder="Paste your text here"
                                        onChange={handleTextChange}
                                        value={paraphrasePrompt.text}
                                        ref={textareaRef}
                                        rows="1"
                                    ></textarea>
                                    <div className="btns" style={{ display: "flex !important" }}>

                                        <div className="btn">
                                            <select name="mode" id="mode" onChange={handlemodeChange}>
                                                <option value="Standard" selected>Standard</option>
                                                <option value="Fluent"> Fluent</option>
                                                <option value="Natural"> Natural</option>
                                                <option value="Formal"> Formal</option>
                                                <option value="Academic"> Academic</option>
                                                <option value="Simple"> Simple</option>
                                                <option value="Creative"> Creative</option>
                                                <option value="Expand"> Expand</option>
                                                <option value="Shorten"> Shorten</option>
                                                <option value="Custom"> Custom</option>
                                            </select>
                                        </div>

                                        <div className="btn"
                                            onClick={handleSend}
                                        >{send_icon} 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



        // <Template title="Paraphraser" phrase="Let's cut to the chase !" fillerText="Summarize instantly : Paste your text and set your word limit." mode="yes"/>
    )
}

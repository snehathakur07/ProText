import React, { useEffect, useRef, useState } from 'react';

import Filler from "../../Template/Filler";
import { assets } from "../../../asset/asset";
import { useGlobalContext } from '../../../Context/GlobalContext';
import '../../Template/template.css'
import '../../Template/Prompt.css'
import Top from '../../top'

export default function GrammarChecker() {
    const { grammarCheckPrompt,
        setGrammarCheckPrompt,
        grammarCheckResponse,
        addGrammarCheck, formatText, loading } = useGlobalContext();
    const textareaRef = useRef(null);

    const handleTextChange = (event) => {
        setGrammarCheckPrompt({ ...grammarCheckPrompt, text: event.target.value });
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

    const handleSend = async () => {
        await addGrammarCheck(grammarCheckPrompt);
        
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
    }, [grammarCheckPrompt.text]);

    const { send_icon } = assets;

    return (
        <div className='main tools spell'>
            <div className="summarizer">
                <div className="summarizer-con">
                    <Top/>
                    <div className="upper-summ">
                        <div className="title-summ"><h1>Grammar & Style Checker </h1></div>
                        <div className="sub-title-summ"><h3>Polish your Prose to Perfection</h3></div>
                    </div>
                    <div className="inner-summ">
                        <div className="display">
                            {loading === true ? "hello"
                                :
                                (grammarCheckResponse.suggestions === "" && grammarCheckResponse.example==="") ?
                                    <Filler text="Receive tailored suggestions and an improved version of your text for flawless writing." />
                                    :
                                    <div className="response">
                                        <div><h3>Suggestions</h3></div>
                                        <p>
                                            <div className="summary-content" dangerouslySetInnerHTML={{ __html: formatText(grammarCheckResponse.suggestions) }} />
                                        </p>
                                        <div><h3>Example</h3></div>
                                        <p>
                                            <div className="summary-content" dangerouslySetInnerHTML={{ __html: formatText(grammarCheckResponse.example) }} />
                                        </p>
                                        
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
                                        value={grammarCheckPrompt.text}
                                        ref={textareaRef}
                                        rows="1"
                                    ></textarea>
                                    <div className="btns" style={{ display: "flex !important" }}>
                                        <div className="btn" onClick={handleSend}>
                                            <img src={send_icon} alt="send" width="30" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

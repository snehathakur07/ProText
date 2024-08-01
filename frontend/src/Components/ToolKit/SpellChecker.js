import React, { useEffect, useRef, useState } from 'react';

import Filler from "../Template/Filler";
import { assets } from "../../asset/asset";
import { useGlobalContext } from '../../Context/GlobalContext';
import '../Template/template.css'
import '../Template/Prompt.css'
import Top from '../top'
import Response from "../Response"

export default function SpellChecker() {
    const { spellCheckPrompt, setSpellCheckPrompt, addSpellCheck, spellCheckResponse, formatText, loading } = useGlobalContext();
    const textareaRef = useRef(null);

    const handleTextChange = (event) => {
        setSpellCheckPrompt({ ...spellCheckPrompt, text: event.target.value });
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
        await addSpellCheck(spellCheckPrompt);
        
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
    }, [spellCheckPrompt.text]);

    const { send_icon,loader } = assets;

    return (
        <div className='main tools spell'>
            <div className="summarizer">
                <div className="summarizer-con">
                    <Top/>
                    <div className="upper-summ">
                        <div className="title-summ"><h1>SpellChecker </h1></div>
                        <div className="sub-title-summ"><h3>Fix Typos and Misspellings Swiftly</h3></div>
                    </div>
                    <div className="inner-summ">
                        <div className="display">
                            {loading ? loader
                                : spellCheckResponse.content === "" ?
                                    <Filler text="Receive a polished version of your text, corrected for any spelling issues." />
                                    :
                                    <Response response={spellCheckResponse} title="Corrected Version"/>
                                    
                            }
                        </div>
                        <div className="Prompt">
                            <div className="prompt">
                                <div className="bar">
                                    <textarea
                                        id="text-input"
                                        placeholder="Paste your text here"
                                        onChange={handleTextChange}
                                        value={spellCheckPrompt.text}
                                        ref={textareaRef}
                                        rows="1"
                                    ></textarea>
                                    <div className="btns" style={{ display: "flex !important" }}>
                                        <div className="btn" onClick={handleSend}>
                                            {send_icon}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

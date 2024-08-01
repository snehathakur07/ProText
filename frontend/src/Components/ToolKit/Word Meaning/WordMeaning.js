import React, { useEffect, useRef, useState } from 'react';
import Filler from "../../Template/Filler";
import { assets } from "../../../asset/asset";
import { useGlobalContext } from '../../../Context/GlobalContext';
import '../../Template/template.css'
import '../../Template/Prompt.css'
import Response from './Response';
import Top from '../../top'

export default function WordMeaning() {
    const { wordMeaningPrompt, setwordMeaningPrompt, addWordMeaning, wordMeaningResponse, loading } = useGlobalContext();
    const textareaRef = useRef(null);


    const handleTextChange = (event) => {
        setwordMeaningPrompt({ ...wordMeaningPrompt, word: event.target.value });
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
        await addWordMeaning(wordMeaningPrompt);
        setwordMeaningPrompt({
            word:""
        })
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
    }, [wordMeaningPrompt.text]);

    const { send_icon } = assets;

    return (
        <div className='main tools'>
            <div className="summarizer">
                <div className="summarizer-con">
                    <Top/>
                    <div className="upper-summ">
                        <div className="title-summ"><h1>Word Meaning </h1></div>
                        <div className="sub-title-summ"><h3>Unveil the Depths of Vocabulary !</h3></div>
                    </div>
                    <div className="inner-summ">
                        <div className="display">
                            {loading === true ? "hello"
                                :
                                wordMeaningResponse.word === "" ?
                                    <Filler text="Enter a word/phrase to get its definition, synonyms, antonyms, and usage examples." />
                                    :
                                    <Response/>
                            }
                        </div>
                        <div className="Prompt">
                            <div className="prompt">
                                <div className="bar">
                                    <textarea
                                        id="text-input"
                                        placeholder="Enter a word or phrase"
                                        onChange={handleTextChange}
                                        value={wordMeaningPrompt.word}
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
    )
}

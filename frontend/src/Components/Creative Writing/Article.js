import React, { useEffect, useRef, useState } from 'react';
import Filler from "../Template/Filler";
import { assets } from "../../asset/asset";
import { useGlobalContext } from "../../Context/GlobalContext"
import '../Template/template.css'
import "../Template/Prompt.css"
import Top from '../top'
import Response from "../Response"

export default function Article() {
    const { articlePrompt, setArticlePrompt, addArticle, articleResponse, formatText, loading } = useGlobalContext();
    const textareaRef = useRef(null);
    const [wordLimit, setWordLimit] = useState('wordlimit'); // State for word limit selection

    const handleTextChange = (event) => {
        setArticlePrompt({ ...articlePrompt, context: event.target.value });
        autoResizeTextarea();
    };

    const handleWordLimitChange = (event) => {
        setWordLimit(event.target.value); // Update the state with selected word limit
        setArticlePrompt({ ...articlePrompt, wordLimit: event.target.value });
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
        setWordLimit('wordlimit'); // Reset the word limit selection to the disabled option
        await addArticle(articlePrompt);
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
    }, [articlePrompt.text]);

    //  const formattedContent = formatText(articleResponse.content);
    const { send_icon,loader } = assets;

    return (
        <div className='main tools'>
            <div className="summarizer">
                <div className="summarizer-con">
                    <Top/>
                    <div className="upper-summ">
                        <div className="title-summ"><h1>Articles </h1></div>
                        <div className="sub-title-summ"><h3>Craft articles that captivate.</h3></div>
                    </div>
                    <div className="inner-summ">
                        <div className="display">
                            {loading === true ? loader
                                :
                                articleResponse.title === "" ?
                                    <Filler text="Share your topic and watch a compelling article come to life." />
                                    :
                                    <Response response={articleResponse} title={articleResponse.title}/>
                            }
                        </div>
                        <div className="Prompt">
                            <div className="prompt">
                                <div className="bar">
                                    <textarea
                                        id="text-input"
                                        placeholder="Enter your topic/context here"
                                        onChange={handleTextChange}
                                        value={articlePrompt.context}
                                        ref={textareaRef}
                                        rows="1"
                                    ></textarea>
                                    <div className="btns" style={{ display: "flex !important" }}>
                                        <div className="btn">
                                            <select name="word-limit" id="wordlimit" onChange={handleWordLimitChange} value={wordLimit}>
                                                <option value="wordlimit" disabled>Word Limit</option>
                                                <option value="200">200</option>
                                                <option value="300">300</option>
                                                <option value="400">400</option>
                                                <option value="500">500</option>
                                                <option value="1000">1000</option>
                                                <option value="1500">1500</option>
                                                <option value="2000">2000</option>
                                                
                                            </select>
                                        </div>
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

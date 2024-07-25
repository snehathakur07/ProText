import React, { useEffect, useRef, useState } from 'react';
import Filler from "../Template/Filler";
import { assets } from "../../asset/asset";
import { useGlobalContext } from "../../Context/GlobalContext"
import '../Template/template.css'
import "../Template/Prompt.css"
import Top from '../top'

export default function Debate() {
    const { debatePrompt, setDebatePrompt, addDebate, debateResponse, formatText, loading } = useGlobalContext();
    const textareaRef = useRef(null);
    const [motion, setMotion] = useState(''); // State for word limit selection

    const handleTextChange = (event) => {
        setDebatePrompt({ ...debatePrompt, context: event.target.value });
        autoResizeTextarea();
    };

    const handleMotionChange = (event) => {
        setMotion(event.target.value); // Update the state with selected word limit
        setDebatePrompt({ ...debatePrompt, motion: event.target.value });
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

        setMotion(''); // Reset the word limit selection to the disabled option
        await addDebate(debatePrompt);
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
    }, [debatePrompt.text]);

    const { send_icon } = assets;

    return (
        <div className='main tools'>
            <div className="summarizer">
                <div className="summarizer-con">
                    <Top />
                    <div className="upper-summ">
                        <div className="title-summ"><h1>Debates </h1></div>
                        <div className="sub-title-summ"><h3>Build arguments that persuade.</h3></div>
                    </div>
                    <div className="inner-summ">
                        <div className="display">
                            {loading === true ? "hello"
                                :
                                debateResponse.title === "" ?
                                    <Filler text="State your position and get arguments that sway opinions." />
                                    :
                                    <div className="response">
                                        <div><h3>{debateResponse.title}</h3></div>
                                        <p>
                                            <div className="summary-content" dangerouslySetInnerHTML={{ __html: formatText(debateResponse.content) }} />
                                        </p>
                                    </div>
                            }
                        </div>
                        <div className="Prompt">
                            <div className="prompt">
                                <div className="bar">
                                    <textarea
                                        id="text-input"
                                        placeholder="Enter your topic/context here"
                                        onChange={handleTextChange}
                                        value={debatePrompt.context}
                                        ref={textareaRef}
                                        rows="1"
                                    ></textarea>
                                    <div className="btns" style={{ display: "flex !important" }}>
                                        <div className="btn">
                                            <select name="motion" id="motion" onChange={handleMotionChange} value={motion}>
                                                <option value="" disabled>Select Your Stance</option>
                                                <option value="for">For the Motion</option>
                                                <option value="against">Against the Motion</option>
                                            </select>


                                        </div>
                                    </div>
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
    )
}

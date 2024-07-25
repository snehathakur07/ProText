import React, { useEffect, useRef, useState } from 'react';
import Filler from "../Template/Filler";
import { assets } from "../../asset/asset";
import { useGlobalContext } from "../../Context/GlobalContext"
import '../Template/template.css'
import "../Template/Prompt.css"
import Top from '../top'

export default function Play() {
    const { playPrompt, setPlayPrompt, addPlay, playResponse, formatText, loading } = useGlobalContext();
    const textareaRef = useRef(null);
    const [genre, setGenre] = useState(''); // State for word limit selection

    const handleTextChange = (event) => {
        setPlayPrompt({ ...playPrompt, context: event.target.value });
        autoResizeTextarea();
    };
    const handleGenreChange = (event) => {
        setGenre(event.target.value); // Update the state with selected word limit
        setPlayPrompt({ ...playPrompt, genre: event.target.value });
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

        setGenre(''); // Reset the word limit selection to the disabled option
        await addPlay(playPrompt);
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
    }, [playPrompt.text]);

    const { send_icon } = assets;

    return (
        <div className='main tools'>
            <div className="summarizer">
                <div className="summarizer-con">
                    <Top />
                    <div className="upper-summ">
                        <div className="title-summ"><h1>Plays </h1></div>
                        <div className="sub-title-summ"><h3>Write plays that dazzle.</h3></div>
                    </div>
                    <div className="inner-summ">
                        <div className="display">
                            {loading === true ? "hello"
                                :
                                playResponse.title === "" ?
                                    <Filler text="Describe your scene and get a script that captivates." />
                                    :
                                    <div className="response">
                                        <div><h3>{playResponse.title}</h3></div>
                                        <p>
                                            <div className="summary-content" dangerouslySetInnerHTML={{ __html: formatText(playResponse.content) }} />
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
                                        value={playPrompt.context}
                                        ref={textareaRef}
                                        rows="1"
                                    ></textarea>
                                    <div className="btns" style={{ display: "flex !important" }}>
                                        <div className="btn">
                                            <select name="genre" id="genre" onChange={handleGenreChange} value={genre}>
                                                <option value="" disabled>Select a Genre</option>
                                                <option value="neutral">Neutral</option>
                                                <option value="tragedy">Tragedy</option>
                                                <option value="comedy">Comedy</option>
                                                <option value="drama">Drama</option>
                                                <option value="farce">Farce</option>
                                                <option value="musical">Musical</option>
                                                <option value="historical">Historical</option>
                                                <option value="melodrama">Melodrama</option>
                                                <option value="one-act">One-Act Play</option>
                                                <option value="absurdist">Absurdist</option>
                                                <option value="romantic">Romantic</option>
                                                <option value="satire">Satire</option>
                                                <option value="experimental">Experimental</option>
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

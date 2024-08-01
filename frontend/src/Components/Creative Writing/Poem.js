import React, { useEffect, useRef, useState } from 'react';
import Filler from "../Template/Filler";
import { assets } from "../../asset/asset";
import { useGlobalContext } from "../../Context/GlobalContext"
import '../Template/template.css'
import "../Template/Prompt.css"
import Top from '../top'

export default function Poem() {
    const { poemPrompt, setPoemPrompt, addPoem, poemResponse, formatText, loading } = useGlobalContext();
    const textareaRef = useRef(null);
    const [genre, setGenre] = useState(''); // State for word limit selection

    const handleTextChange = (event) => {
        setPoemPrompt({ ...poemPrompt, context: event.target.value });
        autoResizeTextarea();
    };
    const handleGenreChange = (event) => {
        setGenre(event.target.value); // Update the state with selected word limit
        setPoemPrompt({ ...poemPrompt, genre: event.target.value });
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
        await addPoem(poemPrompt);
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
    }, [poemPrompt.text]);

    const { send_icon } = assets;

    return (
        <div className='main tools'>
            <div className="summarizer">
                <div className="summarizer-con">
                    <Top />
                    <div className="upper-summ">
                        <div className="title-summ"><h1>Poetry </h1></div>
                        <div className="sub-title-summ"><h3>Compose verses that resonate.</h3></div>
                    </div>
                    <div className="inner-summ">
                        <div className="display">
                            {loading === true ? "hello"
                                :
                                poemResponse.title === "" ?
                                    <Filler text="Enter your theme and get a poem that speaks to the soul." />
                                    :
                                    <div className="response">
                                        <div><h3>{poemResponse.title}</h3></div>
                                        <p>
                                            <div className="summary-content" dangerouslySetInnerHTML={{ __html: formatText(poemResponse.content) }} />
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
                                        value={poemPrompt.context}
                                        ref={textareaRef}
                                        rows="1"
                                    ></textarea>
                                    <div className="btns" style={{ display: "flex !important" }}>
                                        <div className="btn">
                                            <select name="genre" id="genre" onChange={handleGenreChange} value={genre}>
                                                <option value="" disabled>Select a Genre</option>
                                                <option value="neutral">Neutral</option>
                                                <option value="sonnet">Sonnet</option>
                                                <option value="haiku">Haiku</option>
                                                <option value="free-verse">Free Verse</option>
                                                <option value="limerick">Limerick</option>
                                                <option value="elegy">Elegy</option>
                                                <option value="ode">Ode</option>
                                                <option value="acrostic">Acrostic</option>
                                                <option value="narrative">Narrative</option>
                                                <option value="epic">Epic</option>
                                                <option value="ballad">Ballad</option>
                                                <option value="sestina">Sestina</option>
                                                <option value="villanelle">Villanelle</option>
                                                <option value="blank-verse">Blank Verse</option>
                                            </select>
                                        </div>
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
    )
}

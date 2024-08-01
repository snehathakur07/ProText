import React, { useEffect, useRef, useState } from 'react';
import Filler from "../Template/Filler";
import { assets } from "../../asset/asset";
import { useGlobalContext } from "../../Context/GlobalContext"
import '../Template/template.css'
import "../Template/Prompt.css"
import Top from '../top'
import Response from '../Response';

export default function Story() {
    const { storyPrompt, setStoryPrompt, addStory, storyResponse, formatText, loading } = useGlobalContext();
    const textareaRef = useRef(null);
    const [wordLimit, setWordLimit] = useState('wordlimit'); // State for word limit selection
    const [genre, setGenre] = useState(''); // State for word limit selection

    const handleTextChange = (event) => {
        setStoryPrompt({ ...storyPrompt, context: event.target.value });
        autoResizeTextarea();
    };

    const handleWordLimitChange = (event) => {
        setWordLimit(event.target.value); // Update the state with selected word limit
        setStoryPrompt({ ...storyPrompt, wordLimit: event.target.value });
    };
    const handleGenreChange = (event) => {
        setGenre(event.target.value); // Update the state with selected word limit
        setStoryPrompt({ ...storyPrompt, genre: event.target.value });
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
        setGenre(''); // Reset the word limit selection to the disabled option
        await addStory(storyPrompt);
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
    }, [storyPrompt.text]);

    const { send_icon, loader } = assets;

    return (
        <div className='main tools'>
            <div className="summarizer">
                <div className="summarizer-con">
                    <Top />
                    <div className="upper-summ">
                        <div className="title-summ"><h1>Stories </h1></div>
                        <div className="sub-title-summ"><h3>Spin stories that enchant.</h3></div>
                    </div>
                    <div className="inner-summ">
                        <div className="display"

                        >
                            {loading === true ? loader
                                :
                                storyResponse.title === "" ?
                                    <Filler text="Input your idea and receive a tale that captivates." />
                                    :
                                    <Response response={storyResponse} title={storyResponse.title} />
                            }
                        </div>
                        <div className="Prompt">
                            <div className="prompt">
                                <div className="bar">
                                    <textarea
                                        id="text-input"
                                        placeholder="Enter your topic/context here"
                                        onChange={handleTextChange}
                                        value={storyPrompt.context}
                                        ref={textareaRef}
                                        rows="1"
                                    ></textarea>
                                    <div className="btns" style={{ display: "flex !important" }}>
                                        <div className="btn">
                                            <select name="genre" id="genre" onChange={handleGenreChange} value={genre}>
                                                <option value="" disabled selected>Select a Genre</option>
                                                <option value="neutral">Neutral</option>
                                                <option value="adventure">Adventure</option>
                                                <option value="fantasy">Fantasy</option>
                                                <option value="science-fiction">Science Fiction</option>
                                                <option value="mystery">Mystery</option>
                                                <option value="thriller">Thriller</option>
                                                <option value="romance">Romance</option>
                                                <option value="historical-fiction">Historical Fiction</option>
                                                <option value="horror">Horror</option>
                                                <option value="drama">Drama</option>
                                                <option value="comedy">Comedy</option>
                                                <option value="dystopian">Dystopian</option>
                                                <option value="literary-fiction">Literary Fiction</option>
                                                <option value="young-adult">Young Adult</option>
                                                <option value="children">Children's Fiction</option>
                                            </select>

                                        </div>
                                        <div className="btn">
                                            <select name="word-limit" id="wordlimit" onChange={handleWordLimitChange} value={wordLimit}>
                                                <option value="wordlimit" disabled>Word Limit</option>
                                                {/* <option value="50">&lt; 200</option> */}

                                                <option value="200">200</option>
                                                <option value="300">300</option>
                                                <option value="400">400</option>
                                                <option value="500">500</option>
                                                <option value="600">600</option>
                                                <option value="700">700</option>
                                                <option value="800">800</option>
                                                <option value="900">900</option>
                                                <option value="1000">1000</option>
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

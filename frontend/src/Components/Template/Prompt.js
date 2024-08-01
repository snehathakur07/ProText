import React from "react";
import "./Prompt.css";
import { assets } from '../../asset/asset';
export default function Prompt(props) {
    //   const { prompt, setPrompt, sendPrompt } = useContext(Context);
    const handleChange = (event) => {
        // console.log("before "+prompt)
        // setPrompt(event.target.value);
        // console.log("after "+prompt)
    };
    const { send_icon } = assets;
    return (
        <div className="prompt">
            <div className="bar">
                <input
                    type="text"
                    placeholder="Enter your text here"
                    // value={prompt}
                    onChange={handleChange}
                />
                <div className="btns" style={{ display: "flex !important" }}>
                    {props.wordLimit === "yes" ?
                        <div className="btn">
                            <select name="word-limit" id="wordlimit">
                                <option value="" disabled selected>Word Limit</option>
                                <option value="<100">&lt; 100</option>
                                <option value="200"> 200</option>
                                <option value="500"> 500</option>
                                <option value=">500">&gt; 500</option>
                            </select>
                        </div>
                        : ""}
                    {props.title === "Paraphraser" ?
                        <div className="btn">
                            <select name="mode" id="mode">
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
                        : ""}
                    {prompt === "" ? null : (
                        <div className="btn"
                        // onClick={() => sendPrompt(prompt)}
                        >
                            {send_icon}
                            {/* <img src={send_icon} alt="send" width="30" /> */}
                        </div>

                    )}
                </div>
            </div>
        </div>
    );
}

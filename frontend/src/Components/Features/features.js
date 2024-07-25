import React from 'react'
import './features.css'
import { assets } from '../../asset/asset';
import { Link } from 'react-router-dom';
import Top from '../top'
export default function Features() {
  const { fbg, summary, paraphrase, spell, grammar, wordmean, article, essay, story, poem, play, debate, logo } = assets;
  return (
    <div className='main main-features' style={{
      // background: `url(${fbg})`,
      // backgroundRepeat:'no-repeat',
      // backgroundSize: 'cover',
    }} >
      {/* <div className="overlay"></div> */}
      <div className="features">
        <Top />
        <div className="container-features">
          <div className="title-offer"><h1>What <span>ProText</span> Offers</h1></div>
          <div className="con">
            <div className="inner-offer">
              <h2>Writing Toolkit</h2>
              <ul>

                <li >
                  <div className="sub-title"><h3>Summarizer</h3> {summary}</div>
                  <div className="inner">
                    <p>Paste your text into the Summarizer, select the desired summary length, and get a brief, informative summary in seconds.</p>
                  </div>
                </li>
                <li >
                  <div className="sub-title"><h3>Paraphraser</h3>{paraphrase}</div>
                  <div className="inner">
                    <p>Enter your text and choose the mode of paraphrasing. It offers various modes:</p>
                    <i>Standard, </i>
                    <i>Fluent, </i>
                    <i>Natural, </i>
                    <i>Formal, </i>
                    <i>Academic, </i>
                    <i>Simple, </i>
                    <i>Creative, </i>
                    <i>Expand, </i>
                    <i>Shorten, </i>
                    <i>Custom </i>
                  </div>
                </li>

                {/* <li >
                  <div className="sub-title"><h3>Spell Checker</h3>{spell}</div>
                  <div className="inner">
                    <p> Input your text, and the tool will return the corrected version with all spelling errors fixed.</p>
                  </div>
                </li> */}
                <li >
                  <div className="sub-title"><h3>Spell & Grammar & Style Checker</h3>{grammar}</div>
                  <div className="inner">
                    <p>  Input your text, and the checker will detect issues. You can choose to apply these suggestions manually or use the enhanced version of your text provided by the tool.</p>
                  </div>
                </li>
                <li >
                  <div className="sub-title"><h3>Word Meaning</h3>{wordmean}</div>
                  <div className="inner">
                    <p> Type the word you want to look up, and the tool will display its meaning, synonyms, and usage examples.</p>
                  </div>
                </li>

              </ul>
            </div>
          </div>
          <div className="con">
            <div className="inner-offer">
              <h2>Creative Writing</h2>
              <ul>

                <li >
                  <div className="sub-title"><h3>Essay Generator</h3>{essay}</div>
                  <div className="inner">
                    <p>Provide your topic and key points with word limit. The tool will generate a complete essay draft for you to review and refine.</p>
                  </div>
                </li>
                <li >
                  <div className="sub-title"><h3>Article Writer</h3>{article}</div>
                  <div className="inner">
                    <p>Enter your topic or main ideas, and the tool will produce a draft article. Edit and polish the content to fit your needs.</p>
                  </div>
                </li>

                <li >
                  <div className="sub-title"><h3>Story Creator</h3>{story}</div>
                  <div className="inner">
                    <p> Provide an outline or key elements,and a genre and the tool will generate a complete story draft. Customize and enhance it as desired.</p>
                  </div>
                </li>
                <li >
                  <div className="sub-title"><h3>Poem Composer</h3>{poem}</div>
                  <div className="inner">
                    <p>  Describe your theme or provide specific lines,and a genre and the tool will generate a poem. Adjust the length and style to match your vision.</p>
                  </div>
                </li>
                <li >
                  <div className="sub-title"><h3>Play Writer</h3>{play}</div>
                  <div className="inner">
                    <p>Specify the topic, characters, and key points. The tool will create a draft script for you to review and refine.</p>
                  </div>
                </li>
                <li >
                  <div className="sub-title"><h3>Debate Writer</h3>{debate}</div>
                  <div className="inner">
                    <p>Enter the debate topic, specify for or against the motion, and key points. The tool will generate structured arguments and counterarguments for your review.</p>
                  </div>
                </li>

              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

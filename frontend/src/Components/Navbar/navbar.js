import React from 'react'
import './navbar.css';
import { assets } from '../../asset/asset';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const {  arrow_left, summary, paraphrase, spell, grammar, wordmean, article, essay, story, poem, play, debate } = assets;
    const handleClick = () => {
        const nav = document.querySelector(".nav");
        nav.classList.add("minimize")
    }
    const handleClickMenu = () => {
        const nav = document.querySelector(".nav");
        nav.classList.remove("minimize")
    }
    return (
        <div className='nav'>
            <navbar>
                <div className="btn-nav" onClick={handleClick}>{arrow_left}</div>
                <div className="navbar-container">
                    {/* <div className="top">
                        <div className="logo"> <Link to='/'> <img src={logo} alt="logo" width="60" /> </Link> </div>
                        <div className="name-top"><h3>ProText Studio</h3></div>
                    </div> */}

                    <div className="menu">
                        <hr />
                        <div className="toolkit">
                            <div className="title">TOOLKIT</div>
                            <ul>
                                <li onClick={handleClickMenu}>{summary}<p><Link to='/summarizer'>Summarizer</Link></p></li>
                                <li onClick={handleClickMenu}>{paraphrase}<p><Link to='/paraphraser'>Paraphraser</Link></p></li>
                                <li onClick={handleClickMenu}>{spell}<p><Link to='/spell-checker'>Spell Checker</Link></p></li>
                                <li onClick={handleClickMenu}>{grammar}<p><Link to='/grammar-checker'>Grammar & Style Checker</Link></p></li>
                                <li onClick={handleClickMenu}>{wordmean}<p><Link to='/word-meaning'>Word Meaning</Link></p></li>
                            </ul>
                        </div>

                        <hr />

                        <div className="creative-writing">
                            <div className="title">CREATIVE WRITING</div>
                            <ul>
                                <li onClick={handleClickMenu}>{article}<p><Link to='/article'>Articles</Link></p></li>
                                <li onClick={handleClickMenu}>{essay}<p><Link to='/essay'>Essays</Link></p></li>
                                <li onClick={handleClickMenu}>{story}<p><Link to='/story'>Stories</Link></p></li>
                                <li onClick={handleClickMenu}>{poem}<p><Link to='/poem'>Poems</Link></p></li>
                                <li onClick={handleClickMenu}>{play}<p><Link to='/play'>Plays</Link></p></li>
                                <li onClick={handleClickMenu}>{debate}<p><Link to='/debate'>Debates</Link></p></li>
                            </ul>
                        </div>

                    </div>
                </div>
            </navbar >
        </div >
    )
}

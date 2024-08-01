import React from 'react'
import './main.css'
import { assets } from '../../asset/asset';
import { Link } from 'react-router-dom';
import Top from '../top.js'
export default function Main() {
    const { hands,bg } = assets;

    return (
        <div className='main'
        // style={{ backgroundImage: `url(${bg})` }}

        >
            {/* <div className="overlay"
            // style={{ backgroundImage: `url(${bot})`}}
            ></div> */}


            <div className="container">
                <Top />
                <div className="acc">
                    <div className="button">
                        <Link to='/'> <button className="btn signup">
                            SignUp
                        </button></Link>
                    </div>
                    <div className="button">
                        <Link to='/'> <button className="btn login">
                            Login
                        </button></Link>
                    </div>
                </div>
                {/* <div className="little-text">
                    <p>unleash the Power of Words with</p>
                </div> */}
                <div className=" introo
                "
                // style={{ backgroundImage: `url(${hands})`}}
                >

                    <div className="name">
                        <h1>ProText</h1>
                    </div>
                    <div className="sub-text">
                        <p>Your AI powered Writing Assistant</p>
                    </div>
                    {/* <div className="quote"><span className='last'>" Make every word count "</span></div> */}
                    <div className="button">
                        <Link to='/features'> <button className="btn">
                            Get Started
                        </button></Link>
                    </div>
                </div>
            </div>
            {/* <div className="bg">
                <img src={bg} alt="background" width="500" />
            </div> */}
        </div>

    )
}

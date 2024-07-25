import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../asset/asset.js';
export default function Top() {
  const { logo } = assets
  return (

    <div className="top">
      <div className="logo"> <Link to='/'> <img src={logo} alt="logo" width="60" /> </Link> </div>
      <div className="name-top"><h3>ProText Studio</h3></div>
    </div>

  )
}

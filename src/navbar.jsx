import React from 'react';
import { Link } from 'react-router-dom';
import './index.css'

function Navbar() {
  return (
    <nav className="bg-blue-600  text-white px-4 py-3 shadow">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <h1 className="text-lg font-mono md:text-2xl font-bold">Not Just A Basic Weather App</h1>

        <ul className=' nav-links flex flex-row gap-8'>
          <li><Link to="/weather"  >Weather </Link></li>
          <li><Link to="/horoscope"  >horoscope</Link></li>
        </ul>

      </div>
    </nav>
  );
}

export default Navbar;

import React, { useState } from 'react';
import axios from 'axios';

function Horoscope() {
  
  const zodiacSigns = [
    'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
    'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
  ];

  
  const [sign, setSign] = useState('aries'); 
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  
  const getHoroscope = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await axios.get(`https://api.api-ninjas.com/v1/horoscope?zodiac=${sign}`, {
        headers: {
          'X-Api-Key': 'Enter-your-Api-key-here-between-the-single-quotes'
        }
      });
      setResult(response.data);
    } catch (err) {
      setError('Error fetching horoscope.');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🪐 Horoscope</h1>

      
      <select
        value={sign}
        onChange={(e) => setSign(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      >
        {zodiacSigns.map((s) => (
          <option key={s} value={s}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </option>
        ))}
      </select>

      
      <button
        onClick={getHoroscope}
        className="bg-blue-600 text-white px-4 py-2 rounded 
             hover:bg-blue-700 
             hover:scale-103 
             active:scale-97 
             transition duration-80 ease-in-out"
      >
        Get Horoscope
      </button>

      
      {loading && <p className="mt-4 text-gray-500">Loading...</p>}

      
      {error && <p className="mt-4 text-red-600">{error}</p>}

      
      {result && (
        <div className="mt-6 backdrop-blur-md bg-white/30 border border-white/40 rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-2">
            {result.sign.toUpperCase()} — {result.date}
          </h2>
          <p>{result.horoscope}</p>
        </div>
      )}
    </div>
  );
}

export default Horoscope;

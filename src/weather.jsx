import React, { useState } from 'react';
import axios from 'axios';
import "./index.css"
function Weather() {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [weather, setWeather] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setWeather(null);

    if (!city.trim()) {
      setError('City is required');
      return;
    }

    try {

      const geoRes = await axios.get(`https://api.api-ninjas.com/v1/geocoding?city=${city}&country=${country}`, {
        headers: {
          'X-Api-Key': 'Enter-your-Api-key-here-between-the-quotes'
        }
      });

      const location = geoRes.data[0];
      if (!location) {
        setError('Location not found.');
        return;
      }

      const weatherRes = await axios.get(
        'https://api.open-meteo.com/v1/forecast',
        {
          params: {
            latitude: location.latitude,
            longitude: location.longitude,
            daily: 'sunrise,sunset,uv_index_max,sunshine_duration,daylight_duration',
            hourly: 'visibility,temperature_2m',
            current: 'temperature_2m,is_day,rain',
            temperature_unit: 'fahrenheit'
          }
        }
      );

      setWeather(weatherRes.data);


      setHistory((prev) => [
        { city, country, time: new Date().toLocaleString() },
        ...prev
      ]);
    } catch (err) {
      setError('Something went wrong');
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto text-white">

      
      <div className="backdrop-blur-md bg-white/10 border border-white/30 shadow-lg p-6 rounded-xl mb-6">
        <h2 className="text-2xl font-bold mb-4">🌦️ Weather Search</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">City (required):</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full bg-white/20 text-white placeholder-white/70 border border-white/30 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter city name"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Country (optional):</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full bg-white/20 text-white placeholder-white/70 border border-white/30 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Country (optional)"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 hover:scale-105 active:scale-95 transition-transform duration-150"
          >
            Get Weather
          </button>
          {error && <p className="text-red-300">{error}</p>}
        </form>

        
        {weather && (
          <div className="mt-6 animate-fade-in backdrop-blur-lg bg-white/10 border border-white/30 rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-3">Current Weather</h3>
            <p>🌡️ Temp: {weather.current.temperature_2m}°F</p>
            <p>{weather.current.is_day ? '☀️ Daytime' : '🌙 Nighttime'}</p>
            <p>🌧️ Rain: {weather.current.rain} mm</p>

            <h4 className="mt-4 text-lg font-semibold">☀️ Daily</h4>
            <p>🌅 Sunrise: {weather.daily.sunrise[0]}</p>
            <p>🌇 Sunset: {weather.daily.sunset[0]}</p>
            <p>🌞 Sunshine Duration: {weather.daily.sunshine_duration[0]} mins</p>
            <p>⏳ Daylight Duration: {weather.daily.daylight_duration[0]} mins</p>
            <p>🧴 UV Index Max: {weather.daily.uv_index_max[0]}</p>
          </div>
        )}
      </div>

      
      <div className="backdrop-blur-md bg-white/10 border border-white/30 shadow-lg p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-2">🔁 Search History</h2>
        {history.length === 0 ? (
          <p className="text-white/60">No history yet</p>
        ) : (
          <ul className="space-y-2 text-sm text-white/80">
            {history.map((item, i) => (
              <li key={i} className="border-b border-white/20 pb-1">
                {item.city}
                {item.country && `, ${item.country}`} —{' '}
                <span className="text-white/50">{item.time}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

}

export default Weather;

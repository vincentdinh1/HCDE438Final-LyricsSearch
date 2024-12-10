import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import LyricsDisplay from './components/LyricsDisplay';
import axios from 'axios';
import './App.css';

function App() {
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState('');

  const fetchSongs = async (query) => {
    try {
      // Clear previous error and results
      setError('');
      setSongs([]);

      // Fetch data from Genius API
      const response = await axios.get(
        'https://cors-anywhere.herokuapp.com/https://api.genius.com/search',
        {
          params: { q: query },
          headers: {
            Authorization: `Bearer 2xCdSK9HpEsSU2gW0xbCmMGsWMzJgFIHcpM20FUM8lpo7US_NHZS-imV9XzB5y0k`,
          },
        }
      );

      const hits = response.data.response.hits;

      if (hits.length > 0) {
        const formattedSongs = hits.map((hit) => ({
          title: hit.result.title,
          artist: hit.result.primary_artist.name,
          image: hit.result.song_art_image_thumbnail_url,
        }));
        setSongs(formattedSongs);
      } else {
        setError('No songs found. Please try another search.');
      }
    } catch (err) {
      setError('Failed to fetch songs. Please try again.');
    }
  };

  return (
    <div className="App">
      <h1>Lyrics Search Tool</h1>
      {/* Ensure SearchBar is always visible */}
      <SearchBar onSearch={fetchSongs} />

      {/* Display results below */}
      <div className="results-section">
        {error && <p className="error">{error}</p>}
        <LyricsDisplay songs={songs} error={error} />
      </div>
    </div>
  );
}

export default App;

import React from 'react';

function LyricsDisplay({ songs, error }) {
  if (error) {
    return <p className="center-text">Error: {error}</p>;
  }

  if (!songs || songs.length === 0) {
    return <p className="center-text">Enter lyrics to search for matching songs.</p>;
  }

  return (
    <div className="song-container">
      <h2>Songs/artists that match:</h2>
      {songs.map((song, index) => (
        <div className="song" key={index}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginBottom: '20px',
              marginRight: '20px',
            }}
          >
            <img src={song.image || 'placeholder.png'} alt={song.title} />
            <div className="song-details">
              <p className="title">{song.title}</p>
              <p className="artist">{song.artist}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LyricsDisplay;

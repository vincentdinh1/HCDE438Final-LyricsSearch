import axios from 'axios';

const GENIUS_API_URL = 'https://cors-anywhere.herokuapp.com/https://api.genius.com/search';
const ACCESS_TOKEN = '2xCdSK9HpEsSU2gW0xbCmMGsWMzJgFIHcpM20FUM8lpo7US_NHZS-imV9XzB5y0k';

const getLyrics = async (query) => {
  try {
    console.log(`Fetching lyrics for query: ${query}`);
    const response = await axios.get(GENIUS_API_URL, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      params: {
        q: query,
      },
    });

    if (response.data && response.data.response.hits.length > 0) {
      console.log('Lyrics fetched successfully!');
      return response.data.response.hits[0].result.url; // Return the URL of the first result
    } else {
      throw new Error('No lyrics found for the given query.');
    }
  } catch (error) {
    console.error('Error fetching lyrics:', error.message);
    throw error;
  }
};

export default getLyrics;

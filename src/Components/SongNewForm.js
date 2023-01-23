import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

function SongNewForm() {
  let navigate = useNavigate();

  const addsong = (newsong) => {
    axios
      .post(`${API}/songs`, newsong)
      .then(
        () => {
          navigate(`/songs`);
        },
        (error) => console.error(error)
      )
      .catch((c) => console.warn('catch', c));
  };

  const [song, setsong] = useState({
    name: '',
    artist: '',
    album: '',
    time: '',
    is_favorite: false
  });

  const handleTextChange = (event) => {
    setsong({ ...song, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setsong({ ...song, is_favorite: !song.is_favorite });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addsong(song);
  };
  return (
    <div className="New">
      <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
          id="name"
          value={song.name}
          type="text"
          onChange={handleTextChange}
          placeholder="Name of Website"
          required
        />
        <label htmlFor="artist">Artist:</label>
        <input
          id="artist"
          type="text"
          value={song.artist}
          placeholder="Drake, The Beetles, ..."
          onChange={handleTextChange}
          required
        />
        <label htmlFor="album">Album:</label>
        <input
          id="album"
          type="text"
          value={song.album}
          placeholder="Get Rich or Die Tryin, Illmatic, ..."
          onChange={handleTextChange}
        />
        <label htmlFor="time">Time:</label>
        <input
          id="time"
          type="text"
          value={song.time}
          placeholder="4:00"
          onChange={handleTextChange}
        />
        <label htmlFor="is_favorite">Favorite:</label>
        <input
          id="is_favorite"
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={song.is_favorite}
        />

        <br />
        <input type="submit" />
      </form>
    </div>
  );
}

export default SongNewForm;

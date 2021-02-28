import { useState } from "react";
import { Navigation } from "../components/Navigation";
import styles from "../styles/AddTrack.module.css";

export default function AddTrack() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [coverURL, setCoverURL] = useState("");
  const [audioURL, setAudioURL] = useState("");
  const [message, setMessage] = useState("");

  function handleChange(event) {
    if (event.target.name === "title") {
      setTitle(event.target.value);
    }
    if (event.target.name === "artist") {
      setArtist(event.target.value);
    }
    if (event.target.name === "coverURL") {
      setCoverURL(event.target.value);
    }
    if (event.target.name === "audioURL") {
      setAudioURL(event.target.value);
    }
  }
  function handleSubmit(event) {
    const trackData = {
      id:
        artist.trim().split(" ").join("-") +
        "_" +
        title.trim().split(" ").join("-"),
      title: title,
      artist: artist,
      imgSrc: coverURL,
      audioSrc: audioURL,
    };

    event.preventDefault();
    const postParameters = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trackData),
    };
    fetch("http://localhost:3000/api/tracks", postParameters).then(
      (response) => {
        if (response.status === 409) {
          setMessage("This track already exists.");
        }
        if (response.status === 201) {
          setMessage("This track was successfully added.");
        }
        console.log(response);
        return response.json();
      }
    );
  }
  return (
    <>
      <Navigation />
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div>Title:</div>
          <input
            className={styles.input}
            type="text"
            required
            name="title"
            value={title}
            onChange={handleChange}
          />
          <div>Artist:</div>
          <input
            className={styles.input}
            type="text"
            required
            name="artist"
            value={artist}
            onChange={handleChange}
          />

          <div>Cover URL:</div>
          <input
            className={styles.input}
            type="text"
            required
            name="coverURL"
            value={coverURL}
            onChange={handleChange}
          />

          <div>Audio URL:</div>
          <input
            className={styles.input}
            type="text"
            required
            name="audioURL"
            value={audioURL}
            onChange={handleChange}
          />

          <input className={styles.submit} type="submit" value="Add Track" />
        </form>
        <div className={styles.hints}>
          <div className={styles.message}>{message}</div>
          <div className={styles.coverURL}></div>
          <img src={coverURL} />
        </div>
      </div>
    </>
  );
}

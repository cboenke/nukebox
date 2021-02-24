import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";
import AudioPlayer from "../../components/ReactAudioPlayer";
import TrackDetails from "../../components/TrackDetails";
import { APITrack, getTrack } from "../../utils/api";
import { Navigation } from "../../components/Navigation";
import styles from "../../styles/TrackView.module.css";

export default function Track() {
  const [track, setTrack] = useState<APITrack>(null);
  const router = useRouter();
  const { id } = router.query;
  const [favorite, setFavorite] = useState(null);
  const [storedValue, setValue] = useLocalStorage("favoriteSong", "");

  useEffect(() => {
    if (typeof id !== "string" || favorite === null) {
      return;
    }
    if (favorite) {
      setValue(id);
    }
    if (!favorite) {
      setValue("");
    }
  }, [favorite]);

  useEffect(() => {
    if (typeof id !== "string") {
      return;
    }
    getTrack(id).then((currentTrack) => {
      setTrack(currentTrack);
      setFavorite(id === storedValue);
    });
  }, [id]);

  if (!track) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <header>
        <Navigation />
      </header>
      <main>
        <TrackDetails
          imgSrc={track.imgSrc}
          title={track.title}
          artist={track.artist}
        />
      </main>
      <button onClick={() => setFavorite(!favorite)}>
        {favorite ? "💘" : "🖤"}
      </button>
      <footer>
        <AudioPlayer src={track.audioSrc} />
      </footer>
    </div>
  );
}

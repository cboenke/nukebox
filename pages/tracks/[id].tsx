import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (typeof id !== "string" || favorite === null) {
      return;
    }
    if (favorite) {
      localStorage.setItem("favoriteSong", id);
    }
    if (!favorite) {
      localStorage.removeItem("favoriteSong");
    }
  }, [favorite]);

  useEffect(() => {
    if (typeof id !== "string") {
      return;
    }
    getTrack(id).then((currentTrack) => {
      setTrack(currentTrack);
      setFavorite(id === localStorage.getItem("favoriteSong"));
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

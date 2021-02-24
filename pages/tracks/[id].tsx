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
  const [favoriteSongs, setFavoriteSongs] = useLocalStorage(
    "favoriteSongs",
    []
  );
  const favorite = favoriteSongs.includes(id);

  useEffect(() => {
    if (typeof id !== "string") {
      return;
    }
    getTrack(id).then((currentTrack) => {
      setTrack(currentTrack);
    });
  }, [id]);

  const handleFavoriteClick = () => {
    if (favorite) {
      const newFavoriteSongs = favoriteSongs.filter(
        (favoriteSong) => favoriteSong !== id
      );
      setFavoriteSongs(newFavoriteSongs);
    } else {
      setFavoriteSongs([...favoriteSongs, id]);
    }
  };

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
      <button onClick={handleFavoriteClick}>{favorite ? "💘" : "🖤"}</button>
      <footer>
        <AudioPlayer src={track.audioSrc} />
      </footer>
    </div>
  );
}

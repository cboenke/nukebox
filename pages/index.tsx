import Head from "next/head";
import styles from "../styles/Home.module.css";
import Greeting from "../components/Greetings";
import TrackItem from "../components/TrackItem";
import useLocalStorage from "../hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { APITrack, getTracks } from "../utils/api";
import Link from "next/link";

export default function Home() {
  const [tracks, setTracks] = useState<APITrack[]>([]);
  const [favoriteSongs] = useLocalStorage<string[]>("favoriteSongs", []);

  useEffect(() => {
    console.log("Homepage is mounted");
    getTracks().then((newTracks) => {
      setTracks(newTracks);
    });
  }, []);

  const favoriteTrackItems = tracks
    .filter((track) => favoriteSongs.includes(track.id))
    .map((track) => (
      <Link href={`/tracks/${track.id}`} key={track.id}>
        <a>
          <TrackItem
            imgSrc={track.imgSrc}
            title={track.title}
            artist={track.artist}
          />
        </a>
      </Link>
    ));

  const trackItems = tracks
    .filter((track) => !favoriteSongs.includes(track.id))
    .map((track) => (
      <Link href={`/tracks/${track.id}`} key={track.id}>
        <a>
          <TrackItem
            imgSrc={track.imgSrc}
            title={track.title}
            artist={track.artist}
          />
        </a>
      </Link>
    ));

  return (
    <div className={styles.container}>
      <Head>
        <title>Nukebox</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Nukebox
      <Greeting name="Clara" />
      <main className={styles.main}>
        <p>Favoriten:</p>
        <ul className={styles.tracklist}>{favoriteTrackItems}</ul>
        <p>Auch super Songs:</p>
        <ul className={styles.tracklist}>{trackItems}</ul>
      </main>
    </div>
  );
}

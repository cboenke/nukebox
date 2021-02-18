import Head from "next/head";
import styles from "../styles/Home.module.css";
import Greeting from "../components/Greetings";
import TrackItem from "../components/TrackItem";
import { useEffect, useState } from "react";
import { APITrack, getTracks } from "../utils/api";

export default function Home() {
  const [tracks, setTracks] = useState<APITrack[]>([]);

  useEffect(() => {
    console.log("Homepage is mounted");
    getTracks().then((newTracks) => {
      setTracks(newTracks);
    });

    // async function doFetch() {
    //   const newTracks = await getTracks();
    //   setTracks(newTracks);
    // }
    // doFetch()
  }, []);

  const trackItems = tracks.map((track) => (
    <TrackItem
      key={`${track.artist}_${track.title}`}
      imgSrc={track.imgSrc}
      title={track.title}
      artist={track.artist}
    />
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
        <ul className={styles.tracklist}>{trackItems}</ul>
      </main>
    </div>
  );
}

import Head from "next/head";
import styles from "../styles/Home.module.css";
import Greeting from "../components/Greetings";
import TrackItem from "../components/TrackItem";

export default function Home() {
  const tracks = [
    {
      imgSrc: "/img_track_1.jpg",
      title: "Wer wenn nicht wir",
      artist: "Wincent Weiss",
    },
    {
      imgSrc: "/img_track_2.jpg",
      title: "Found",
      artist: "Dan Davidson",
    },
    {
      imgSrc: "/img_track_3.jpg",
      title: "Knockin' Boots",
      artist: "Luke Bryan",
    },
    {
      imgSrc: "/img_track_4.jpg",
      title: "Corazón En La Maleta",
      artist: "Luis Fonsi",
    },
    {
      imgSrc: "/img_track_5.jpg",
      title: "Savage Love (Laxed - Siren Beat)",
      artist: "Jawsh 685, Jason Derulo",
    },
  ];

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

import Head from "next/head";
import styles from "../styles/Home.module.css";
import Greeting from "../components/Greetings";
import TrackItem from "../components/TrackItem";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Nukebox</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Nukebox
      <Greeting name="Clara" />
      <main className={styles.main}>
        <ul className={styles.tracklist}>
          <TrackItem
            cover="/cover_track_1.jpg"
            artist="F Your Purse"
            title="The Read"
          />
        </ul>
      </main>
    </div>
  );
}

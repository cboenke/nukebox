import Head from "next/head";
import styles from "../styles/Home.module.css";
import Greeting from "../components/Greetings";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Nukebox</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Nukebox
      <Greeting name="Clara" />
    </div>
  );
}

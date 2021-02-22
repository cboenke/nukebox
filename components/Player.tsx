import styles from "../styles/Player.module.css";

type AudioFile = {
  audioSrc: string;
};

export function Player(props: AudioFile) {
  return (
    <div className={styles.audioPlayer}>
      <audio controls src={props.audioSrc}>
        Your browser does not support the <code>audio</code> element.
      </audio>
    </div>
  );
}

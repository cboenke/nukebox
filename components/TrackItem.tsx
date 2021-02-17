import styles from "../styles/TrackItem.module.css";

type Props = {
  artist: string;
  title: string;
  cover: string;
};

export default function TrackItem(props: Props) {
  return (
    <li className={styles.listitem}>
      <img className={styles.cover} src={props.cover} />
      <h4 className={styles.artist}>{props.artist}</h4>
      <p className={styles.title}>{props.title}</p>
    </li>
  );
}

import { useRouter } from "next/router";
import styles from "../styles/Navigation.module.css";

export function Navigation() {
  const router = useRouter();

  return (
    <div className={styles.navigation} onClick={() => router.back()}>
      &lt; Now playing
    </div>
  );
}

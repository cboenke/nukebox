import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Player } from "../../components/Player";
import TrackDetails from "../../components/TrackDetails";
import { APITrack, getTrack } from "../../utils/api";

export default function Track() {
  const router = useRouter();
  const { id } = router.query;
  const [track, setTrack] = useState<APITrack>(null);

  useEffect(() => {
    if (typeof id !== "string") {
      return;
    }
    getTrack(id).then((currentTrack) => {
      setTrack(currentTrack);
    });
  }, [id]);

  if (!track) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* <header><Navigation /></header> */}
      <main>
        <TrackDetails
          imgSrc={track.imgSrc}
          title={track.title}
          artist={track.artist}
        />
      </main>
      <footer>
        <Player audioSrc={track.audioSrc} />
      </footer>
    </div>
  );
}

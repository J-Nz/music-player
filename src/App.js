import React, {useState, useRef} from "react";
// style
import styles from "./styles/App.module.scss";
// components
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
// data
import data from "./data";


function App() {
    // Ref
    const audioRef = useRef(null);
    // State
    const [songs, setSongs] = useState(data());
    const [currentSong, setCurrentSong] = useState(songs[4]);
    const [isPlaying, setIsPlaying] = useState(false);
    return (
        <div className={styles.App}>
            <Nav/>
            <Song
                audioRef={audioRef}
                songs={songs}
                currentSong={currentSong}
            />
            <Player
                audioRef={audioRef}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                currentSong={currentSong}
            />
            <Library
                audioRef={audioRef}
                songs={songs}
                setCurrentSong={setCurrentSong}
                isPlaying={isPlaying}
                setSongs={setSongs}
            />
        </div>
    );
}

export default App;

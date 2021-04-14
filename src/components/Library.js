import React from "react";
// components
import LibrarySong from "./LibrarySong";
// style
import styles from "../styles/Library.module.scss";


const Library = ({songs, setCurrentSong, audioRef, isPlaying, setSongs, libraryStatus}) => {

    return (
        <div className={`${styles.library} ${libraryStatus ? styles.activeLibrary : ""}`}>
            <h2>Library</h2>
            <div>
                {songs.map((song) => (
                    <LibrarySong
                        audioRef={audioRef}
                        songs={songs}
                        setCurrentSong={setCurrentSong}
                        song={song}
                        id={song.id}
                        key={song.id}
                        isPlaying={isPlaying}
                        setSongs={setSongs}
                    />
                ))}
            </div>
        </div>
    );
};

export default Library;
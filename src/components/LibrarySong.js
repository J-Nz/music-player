import React from "react";
// style
import styles from "../styles/LibrarySong.module.scss";

const LibrarySong = ({song, id, setCurrentSong, songs, audioRef, isPlaying, setSongs}) => {


    const songSelectHandler = async () => {
        await setCurrentSong(song);

        const newSongs = songs.map((song) => {
            if (song.id === id) {
                return {...song, active: true};
            } else {
                return {...song, active: false};
            }
        });
        setSongs(newSongs);
        if (isPlaying) {
            audioRef.current.play();
        }
    };

    return (
        <div onClick={songSelectHandler} className={`${styles.librarySong} ${song.active ? styles.selected : ""}`}>
            <img src={song.cover} alt={song.name}/>
            <div className={styles.songDescription}>
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    );
};

export default LibrarySong;

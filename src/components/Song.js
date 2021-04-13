import React from "react";
import styles from "../styles/Song.module.scss";

const Song = ({currentSong}) => {
    return (
        <div className={styles.songContainer}>
            <img src={currentSong.cover} alt={currentSong.name}/>
            <h2>{currentSong.name}</h2>
            <h3>{currentSong.artist}</h3>
        </div>
    );
};

export default Song;

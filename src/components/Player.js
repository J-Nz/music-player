import React, {useState} from "react";
// style
import styles from "../styles/Player.module.scss";
// fontawesome
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faPlay,
    faAngleLeft,
    faAngleRight,
    faPause,
} from "@fortawesome/free-solid-svg-icons";


const Player = ({currentSong, isPlaying, setIsPlaying, audioRef}) => {

    // Event Handlers
    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        } else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    };
    const timeUpdateHandler = (event) => {
        const current = event.target.currentTime;
        const duration = event.target.duration;
        setSongInfo({...songInfo, currentTime: current, duration: duration})
    };
    const getTime = (time) => {
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
    };
    const dragHandler = (event) => {
        audioRef.current.currentTime = event.target.value;
        setSongInfo({...songInfo, currentTime: event.target.value})
    };
    // State
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
    });
    return (
        <div className={styles.player}>
            <div className={styles.timeControl}>
                <p>{getTime(songInfo.currentTime)}</p>
                <input
                    onChange={dragHandler}
                    min={0}
                    max={songInfo.duration || 0}
                    value={songInfo.currentTime}
                    type="range"
                />
                <p>{getTime(songInfo.duration)}</p>
            </div>
            <div className={styles.playControl}>
                <FontAwesomeIcon className={styles.skipBack} size="2x" icon={faAngleLeft}/>
                <FontAwesomeIcon
                    onClick={playSongHandler}
                    className={styles.play}
                    size="2x"
                    icon={isPlaying ? faPause : faPlay}
                />
                <FontAwesomeIcon className={styles.skipForward} size="2x" icon={faAngleRight}/>
            </div>
            <audio
                onTimeUpdate={timeUpdateHandler}
                onLoadedMetadata={timeUpdateHandler}
                ref={audioRef}
                src={currentSong.audio}
            />
        </div>
    );
};

export default Player;

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


const Player = ({currentSong, isPlaying, setIsPlaying, audioRef, songs, setCurrentSong, setSongs}) => {
    const activeLibraryHandler = (nextPrev) => {
        const newSongs = songs.map((song) => {
            if (song.id === nextPrev.id) {
                return {...song, active: true};
            } else {
                return {...song, active: false};
            }
        });
        setSongs(newSongs);
    };
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

        // Calculate percentage
        const animationPercentage = Math.round(current / duration * 100);
        console.log(animationPercentage);
        setSongInfo({
            ...songInfo,
            currentTime: current,
            duration: duration,
            animationPercentage: animationPercentage,
        });
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
    const skipTrackHandler = async (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if (direction === 'skip-forward') {
            await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
        } else if (direction === 'skip-back') {
            if (currentIndex > 0) {
                await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
                activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
            } else {
                await setCurrentSong(songs[songs.length - 1]);
                activeLibraryHandler(songs[songs.length - 1]);
            }
        }
        if (isPlaying) {
            audioRef.current.play();
        }
    };
    const songEndHandler = async () => {
        await skipTrackHandler('skip-forward');
    };

    // State
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
        animationPercentage: 0,
    });

    // Add styles
    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }
    const trackGrad = {
        background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`
    }

    return (
        <div className={styles.player}>
            <div className={styles.timeControl}>
                <p>{getTime(songInfo.currentTime)}</p>
                <div style={trackGrad} className={styles.track}>
                    <input
                        onChange={dragHandler}
                        min={0}
                        max={songInfo.duration || 0}
                        value={songInfo.currentTime}
                        type="range"
                    />
                    <div style={trackAnim} className={styles.animateTrack}>

                    </div>
                </div>
                <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
            </div>
            <div className={styles.playControl}>
                <FontAwesomeIcon
                    onClick={() => skipTrackHandler('skip-back')}
                    className={styles.skipBack}
                    size="2x"
                    icon={faAngleLeft}
                />
                <FontAwesomeIcon
                    onClick={playSongHandler}
                    className={styles.play}
                    size="2x"
                    icon={isPlaying ? faPause : faPlay}
                />
                <FontAwesomeIcon
                    onClick={() => skipTrackHandler('skip-forward')}
                    className={styles.skipForward}
                    size="2x"
                    icon={faAngleRight}
                />
            </div>
            <audio
                onTimeUpdate={timeUpdateHandler}
                onLoadedMetadata={timeUpdateHandler}
                ref={audioRef}
                src={currentSong.audio}
                onEnded={songEndHandler}
            />
        </div>
    );
};

export default Player;

import React from "react";
// style
import styles from "../styles/Player.module.css";
// fontawesome
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faPlay,
    faAngleLeft,
    faAngleRight
} from "@fortawesome/free-solid-svg-icons";


const Player = () => {
    return (
        <div className={styles.player}>
            <div className={styles.timeControl}>
                <p>Start Time</p>
                <input type="range"/>
                <p>End Time</p>
            </div>
            <div className={styles.playControl}>
                <FontAwesomeIcon className={styles.skipBack} size="2x" icon={faAngleLeft}/>
                <FontAwesomeIcon className={styles.play} size="2x" icon={faPlay}/>
                <FontAwesomeIcon className={styles.skipForward} size="2x" icon={faAngleRight}/>
            </div>
        </div>
    );
};

export default Player;

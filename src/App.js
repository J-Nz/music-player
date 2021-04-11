import React from "react";
// style
import styles from "./styles/App.module.css";

// components
import Player from "./components/Player";
import Song from "./components/Song";

function App() {
    return (
        <div className={styles.App}>
            <Song/>
            <Player/>
        </div>
    );
}

export default App;

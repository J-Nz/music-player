import React from "react";

import styles from "../styles/Nav.module.scss";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMusic} from "@fortawesome/free-solid-svg-icons";


const Nav = ({libraryStatus, setLibraryStatus}) => {

    return (
        <nav className={styles.nav}>
            <h1>Waves</h1>
            <button onClick={() => setLibraryStatus(!libraryStatus)}>
                Library
                <FontAwesomeIcon icon={faMusic}/>
            </button>
        </nav>
    );
};

export default Nav;
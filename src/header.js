import React from "react";
import styles from "./header.module.css";

const Header = ({ setCity, changeLocation }) => {
  return (
    <header>
      <div className={styles.navbar}>
        <h4 className={styles.navbar_content}>Whether app</h4>
        <form
          className={`${styles.navbar_content} ${styles.form}`}
          onSubmit={(e) => {
            e.preventDefault();
            changeLocation();
          }}
        >
          <input
            onChange={(e) => {
              setCity(e.target.value);
            }}
            className={styles.input}
            type="text"
            placeholder="Enter city"
          ></input>
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;

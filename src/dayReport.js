import React from "react";
import styles from "./dayReport.module.css";
import { weatherIcons } from "./utility/icons";

function DayReport({ report }) {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>Today's Whether</h1>
      <div className={styles.card}>
        {report?.map((data) => {
          return (
            <div key={data.time} className={styles.dayReport}>
              <h6 className={styles.time}>{data.time}</h6>
              <img
                className={styles.icon}
                height={94}
                width={94}
                src={weatherIcons[data.icon]}
                alt="whether img"
              />
              <h6 className={styles.temperature}>{data.temperature}&deg;</h6>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DayReport;

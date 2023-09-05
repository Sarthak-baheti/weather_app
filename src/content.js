import React from "react";
import styles from "./content.module.css";
import DayReport from "./dayReport";
import { weatherIcons } from "./utility/icons";

const Content = ({ weather }) => {
  return (
    <div className={styles.content_wrapper}>
      <h1 className={styles.city}>{weather.city}</h1>
      <h4 className={styles.date}>{weather.day}</h4>
      <div className={styles.city_whether}>
        <div className={styles.whether_details}>
          <img
            className={styles.whether_icon}
            src={weatherIcons[weather.icon]}
            alt="whether_icon"
          />
          <div>
            <h1 className={styles.temperature}>
              {weather.currentTemperature}&deg;
            </h1>
            <h4>{weather.description}</h4>
          </div>
        </div>
        <div className={styles.whether_others}>
          {weather.condition?.map((data) => {
            return (
              <div key={data.condition} className={styles.temp_details}>
                <h6 className={styles.measure}>{data.value}</h6>
                <h4 className={styles.condition}>{data.condition}</h4>
              </div>
            );
          })}
        </div>
      </div>
      <DayReport report={weather.hourlyWeather}></DayReport>
    </div>
  );
};

export default Content;

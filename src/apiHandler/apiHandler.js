import axios from "axios";

const weeks = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const convertTimestamp = (timestamp) => {
  const date = new Date(timestamp * 1000);
  let hour = date.getHours();
  const AmOrPm = hour >= 12 ? "pm" : "am";
  hour = hour % 12 || 12;
  const minutes = date.getMinutes();
  const time = `${hour}:${minutes} ${AmOrPm}`;
  return time;
};
const findDay = (timestamp) => {
  const date = new Date(timestamp * 1000);
  const day = date.getDay();
  const todayDate = date.getDate();
  const month = date.getMonth();
  const formattedDate = `${weeks[day]} ${todayDate} ${months[month]}`;
  return formattedDate;
};

const hourlyWeather = (hourlyResponse) => {
  return hourlyResponse.data.list.map((list) => {
    return {
      temperature: list.main.temp,
      time: convertTimestamp(list.dt),
      icon: list.weather[0].icon,
    };
  });
};

export const currentWeather = async (city) => {
  try {
    const [dayResponse, hourlyWeatherResponse] = await Promise.all([
      axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ee4418995b3663206c5194d786fb7b9f&units=metric`
      ),
      axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=6&appid=ee4418995b3663206c5194d786fb7b9f&units=metric`
      ),
    ]);

    const weatherReport = {
      currentTemperature: Math.floor(dayResponse.data.main.temp),
      city: dayResponse.data.name,
      day: findDay(dayResponse.data.dt),
      icon: dayResponse.data.weather[0].icon,
      description: dayResponse.data.weather[0].description,
      hourlyWeather: hourlyWeather(hourlyWeatherResponse),
      condition: [
        {
          condition: "High",
          value: `${Math.floor(dayResponse.data.main.temp_max)}°`,
        },
        {
          condition: "Wind",
          value: `${Math.floor(dayResponse.data.wind.speed)}mph`,
        },
        {
          condition: "sunrise",
          value: convertTimestamp(dayResponse.data.sys.sunrise),
        },
        {
          condition: "Low",
          value: `${Math.floor(dayResponse.data.main.temp_min)}°`,
        },
        { condition: "Humidity", value: `${dayResponse.data.main.humidity}%` },
        {
          condition: "sunset",
          value: convertTimestamp(dayResponse.data.sys.sunset),
        },
      ],
    };

    return weatherReport;
  } catch (error) {
    const apiError = {
      status: error.response.status,
    };
    throw apiError;
  }
};

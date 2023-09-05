import "./App.css";
import Header from "./header";
import Content from "./content";
import { useEffect, useState } from "react";
import { currentWeather } from "./apiHandler/apiHandler";
import Modal from "./modal";

function App() {
  const [city, setCity] = useState("mumbai");
  const [weather, setWeather] = useState([]);
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState("");

  const changeLocation = () => {
    currentWeather(city)
      .then(setWeather)
      .catch((error) => {
        if (error.status === 404) {
          setMessage("Please enter correct location");
          setModal(true);
        } else {
          setMessage("Something went wrong");
          setModal(true);
        }
      });
  };

  useEffect(() => {
    currentWeather(city)
      .then(setWeather)
      .catch(() => {
        setMessage("Something went wrong");
        setModal(true);
      });
  }, []);

  return (
    <>
      <Header setCity={setCity} changeLocation={changeLocation}></Header>
      <Content weather={weather}></Content>
      {modal && <Modal setModal={setModal} message={message}></Modal>}
    </>
  );
}

export default App;

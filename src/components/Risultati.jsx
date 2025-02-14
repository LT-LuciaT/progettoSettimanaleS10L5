import { useState } from "react";
import Search from "./Search";

const Risultati = () => {
  const [meteoData, setMeteoData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=eee1f68d87654a0046257c0175f570f6`
      );
      const data = await response.json();
      setMeteoData(data);
      setError(null);
    } catch (error) {
      console.error("Errore durante il recupero dei dati meteorologici:", error);
      setError("Errore durante il recupero dei dati meteorologici");
    }
  };

  return (
    <div>
      <Search onSearch={handleSearch} />
      {error && <p>{error}</p>}
      {meteoData && (
        <div>
          <h2>{meteoData.name}</h2>
          <p>Temperatura: {(meteoData.main.temp - 273.15).toFixed(2)}°C</p>
          <p>Condizioni: {meteoData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Risultati;

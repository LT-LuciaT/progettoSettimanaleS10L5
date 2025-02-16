import { useState } from "react";
import { Link } from "react-router-dom";

import Search from "./Search";
import "../App.css";
import { Card, Col } from "react-bootstrap";

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
        <Col className="d-flex justify-content-center">
          <Card className="mt-4 p-2">
            <Card.Body>
              <Card.Title>
                {meteoData.name}{" "}
                <img
                  style={{ width: "30px", height: "auto" }}
                  src={`http://openweathermap.org/img/w/${meteoData.weather[0].icon}.png`}
                  alt=""
                />
              </Card.Title>

              <Card.Text>
                <strong>Temperatura:</strong> {(meteoData.main.temp - 273.15).toFixed(2)}°C
              </Card.Text>
              <Card.Text>
                <strong>Condizioni:</strong> {meteoData.weather[0].description}
              </Card.Text>
              <Link
                style={{ textDecoration: "none", color: "rgb(71, 157, 211)" }}
                to={`/dettagli/${meteoData.coord.lat}/${meteoData.coord.lon}`}
              >
                Meteo dei prossimi giorni
              </Link>
            </Card.Body>
          </Card>
        </Col>
      )}
    </div>
  );
};

export default Risultati;

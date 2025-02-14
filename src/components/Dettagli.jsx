import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Col } from "react-bootstrap";

const Dettagli = () => {
  const { lat, lon } = useParams();
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=eee1f68d87654a0046257c0175f570f6`
        );
        const data = await response.json();
        setForecastData(data);
        setError(null);
      } catch (error) {
        console.error("Errore durante il recupero delle previsioni:", error);
        setError("Errore durante il recupero delle previsioni");
      }
    };

    fetchForecast();
  }, [lat, lon]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!forecastData) {
    return <p>Caricamento...</p>;
  }
  const dailyForecasts = forecastData.list.filter((forecast) => {
    const date = new Date(forecast.dt_txt);
    return date.getHours() === 12;
  });

  return (
    <Col className="d-flex justify-content-center">
      <Card className="mt-4">
        <Card.Body>
          <Card.Title>Previsioni per i prossimi 5 giorni</Card.Title>
          {dailyForecasts.map((forecast, index) => (
            <div key={index}>
              <Card.Text>
                <strong>Data:</strong> {new Date(forecast.dt_txt).toLocaleDateString()}
              </Card.Text>
              <Card.Text>
                <strong>Temperatura:</strong> {(forecast.main.temp - 273.15).toFixed(2)}°C
              </Card.Text>
              <Card.Text>
                <strong>Condizioni:</strong> {forecast.weather[0].description}
              </Card.Text>
              <Card.Text>
                <strong>Tempo:</strong>{" "}
                <img
                  src={`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`}
                  alt={forecast.weather[0].description}
                  style={{ width: "30px", height: "auto" }}
                />
              </Card.Text>
              <hr />
            </div>
          ))}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Dettagli;

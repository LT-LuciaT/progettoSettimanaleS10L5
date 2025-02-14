import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../App.css";
import { Card, Container, Row } from "react-bootstrap";

const Dettagli = () => {
  const { lat, lon } = useParams();
  const [forecastData, setForecastData] = useState(null);
  const [MeteoGiornaliero, setMeteoGiornaliero] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=eee1f68d87654a0046257c0175f570f6`
        );
        const data = await response.json();
        setForecastData(data);
        const meteoCorrente = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=eee1f68d87654a0046257c0175f570f6`
        );
        const meteoCorrenteData = await meteoCorrente.json();
        setMeteoGiornaliero(meteoCorrenteData);

        setError(null);
      } catch (error) {
        console.error("Errore durante il recupero delle previsioni:", error);
        setError("Errore durante il recupero delle previsioni");
      }
    };

    fetchData();
  }, [lat, lon]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!forecastData || !MeteoGiornaliero) {
    return <p>Caricamento...</p>;
  }
  const dailyForecasts = forecastData.list.filter((forecast) => {
    const date = new Date(forecast.dt_txt);
    return date.getHours() === 12;
  });

  const sunsetTime = new Date(MeteoGiornaliero.sys.sunset * 1000).toLocaleTimeString();
  const sunriseTime = new Date(MeteoGiornaliero.sys.sunrise * 1000).toLocaleTimeString();

  return (
    <Container>
      <Row>
        <Card.Body>
          <Card.Title>Oggi</Card.Title>
          <Card.Text>
            <strong>Città:</strong> {MeteoGiornaliero.name}
          </Card.Text>
          <Card.Text>
            <strong>Temperatura:</strong> {(MeteoGiornaliero.main.temp - 273.15).toFixed(2)}°C
          </Card.Text>
          <Card.Text>
            <strong>Temperatura minima:</strong> {(MeteoGiornaliero.main.temp_min - 273.15).toFixed(2)}°C
          </Card.Text>
          <Card.Text>
            <strong>Temperatura massima:</strong> {(MeteoGiornaliero.main.temp_max - 273.15).toFixed(2)}°C
          </Card.Text>
          <Card.Text>
            <strong>Pressione:</strong> {MeteoGiornaliero.main.pressure} hPa
          </Card.Text>
          <Card.Text>
            <strong>Umidità:</strong> {MeteoGiornaliero.main.humidity}%
          </Card.Text>
          <Card.Text>
            <strong>Condizioni:</strong> {MeteoGiornaliero.weather[0].description}
          </Card.Text>
          <Card.Text>
            <strong>Icona:</strong>{" "}
            <img
              src={`http://openweathermap.org/img/w/${MeteoGiornaliero.weather[0].icon}.png`}
              alt={MeteoGiornaliero.weather[0].description}
              style={{ width: "30px", height: "auto" }}
            />
          </Card.Text>
          <Card.Text>
            <strong>Alba:</strong> {sunriseTime}
          </Card.Text>
          <Card.Text>
            <strong>Tramonto:</strong> {sunsetTime}
          </Card.Text>
        </Card.Body>
      </Row>

      <h2>Previsioni per i prossimi 5 giorni</h2>
      <Row>
        {dailyForecasts.map((forecast, index) => (
          <Container key={index} className="d-flex justify-content-center">
            <Card className="flex-wrap">
              <Card.Body>
                <Card.Text>
                  <strong>Data:</strong> {new Date(forecast.dt_txt).toLocaleDateString()}
                </Card.Text>
                <Card.Text>
                  <strong>Temperatura:</strong> {(forecast.main.temp - 273.15).toFixed(2)}°C
                </Card.Text>
                <Card.Text>
                  <strong>Temperatura minima:</strong> {(forecast.main.temp_min - 273.15).toFixed(2)}°C
                </Card.Text>
                <Card.Text>
                  <strong>Temperatura massima:</strong> {(forecast.main.temp_max - 273.15).toFixed(2)}°C
                </Card.Text>
                <Card.Text>
                  <strong>Pressione:</strong> {forecast.main.pressure} hPa
                </Card.Text>
                <Card.Text>
                  <strong>Umidità:</strong> {forecast.main.humidity}%
                </Card.Text>
                <Card.Text>
                  <strong>Condizioni:</strong> {forecast.weather[0].description}
                </Card.Text>
                <Card.Text>
                  <strong>Icona:</strong>{" "}
                  <img
                    src={`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`}
                    alt={forecast.weather[0].description}
                    style={{ width: "30px", height: "auto" }}
                  />
                </Card.Text>
              </Card.Body>
            </Card>
          </Container>
        ))}
      </Row>
    </Container>
  );
};

export default Dettagli;

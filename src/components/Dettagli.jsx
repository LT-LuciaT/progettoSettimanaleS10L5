import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../App.css";
import { Card, Container, Col, Row } from "react-bootstrap";

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
      <Row className="justify-content-center mx-auto">
        <Col xs={12} md={12} lg={4} style={{ width: "100%" }}>
          <Card className="mt-4 p-3 ms-4 ">
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
          </Card>
        </Col>
      </Row>

      <h2 className="text-center mt-4">Previsioni per i prossimi 5 giorni</h2>
      <Row className=" mx-auto ">
        {dailyForecasts.map((forecast, index) => (
          <Col key={index} className="p-0 px-md-2" style={{ width: "auto" }}>
            <Card xs={2} md={2} lg={4} className="mt-4 " style={{ width: "100%" }}>
              <Card.Body className="d-flex flex-column ms-2 mt-4">
                <div className="d-none d-md-block p-2">
                  <strong>Data:</strong> {new Date(forecast.dt_txt).toLocaleDateString()}
                </div>
                <div className="d-none d-md-block p-2 ">
                  <strong>Temperatura:</strong> {(forecast.main.temp - 273.15).toFixed(2)}°C
                </div>
                <div className="p-2">
                  <strong className="d-none d-md-block">Temperatura minima:</strong>{" "}
                  {(forecast.main.temp_min - 273.15).toFixed(2)}°C
                </div>
                <div className="p-2">
                  <strong className="d-none d-md-block ">Temperatura massima:</strong>{" "}
                  {(forecast.main.temp_max - 273.15).toFixed(2)}°C
                </div>
                <div className="d-none d-md-block p-2">
                  <strong>Pressione:</strong> {forecast.main.pressure} hPa
                </div>
                <div className="d-none d-md-block p-2">
                  <strong>Umidità:</strong> {forecast.main.humidity}%
                </div>
                <div className="p-2">
                  <strong className="d-none d-md-block ">Condizioni:</strong>{" "}
                  <strong>{forecast.weather[0].description}</strong>
                </div>
                <div className="p-2">
                  <strong className="d-none d-md-block ">Icona:</strong>{" "}
                  <img
                    src={`http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`}
                    alt={forecast.weather[0].description}
                    style={{ width: "70px", height: "auto" }}
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Dettagli;

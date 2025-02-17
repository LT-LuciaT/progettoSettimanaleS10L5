import { useState } from "react";
import { Row, Button, Form, Col } from "react-bootstrap";
import "../App.css";

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=eee1f68d87654a0046257c0175f570f6`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        onSearch(lat, lon);
      } else {
        alert("Città non trovata");
      }
    } catch (error) {
      console.error("Errore durante la ricerca della città:", error);
    }
  };

  return (
    <Form className="d-flex justify-content-center">
      <Row className="flex-wrap">
        <Col>
          <Form.Control
            type="search"
            placeholder="Search"
            className="mt-5"
            aria-label="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button variant="outline-primary" onClick={handleSearch}>
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default Search;

import { Container, Navbar } from "react-bootstrap";
import logo from "../assets/nuvola-pioggia.jpg";

const MyNav = () => {
  return (
    <Navbar>
      <Container className="my-auto justify-content-center">
        <Navbar.Brand href="#home" className="d-flex ">
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-center
        "
            alt="React Bootstrap logo"
          />
          <h2 className="d-none d-md-block ps-2 align-center mb-0">Meteo</h2>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default MyNav;

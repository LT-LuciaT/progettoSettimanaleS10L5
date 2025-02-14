import { Container, Navbar } from "react-bootstrap";
import logo from "../assets/nuvola-pioggia.jpg";

const MyNav = () => {
  return (
    <Navbar className="bg-body-tertiary">
      <Container className="my-auto justify-content-center">
        <Navbar.Brand href="#home">
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-center
        "
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default MyNav;

// src/components/Home.tsx
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../App.css';

function Home() {
    return (
        <Container className="center-screen">
            <h1>People Management</h1>
            <br></br>
            <h2>Menú Principal</h2>
            <Row className="mt-4 w-50">
                <Col xs={12} className="mb-2">
                    <Link to="/persons" className="w-100">
                        <Button variant="primary" className="w-100">
                            Listar Personas
                        </Button>
                    </Link>
                </Col>
                <Col xs={12}>
                    <Link to="/gorest" className="w-100">
                        <Button variant="secondary" className="w-100">
                            Consumir GoRest
                        </Button>
                    </Link>
                </Col>
            </Row>
        </Container>
    );
}

export default Home;

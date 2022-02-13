import React, { Component } from "react";
import { Container, Row, Col, Button, Form, Card, Navbar } from "react-bootstrap";
import logo from "../white.png";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { content: "catalog" };
    }

    peliculaCard(nombre, categoria, duracion, director, protagonistas){
        return (
            <Card className="p-2">
                <Container fluid={true}>
                    <h4 className="text-left mb-0 mt-2 text-dark font-weight-bold">{nombre}</h4>
                    <p className="text-left mb-1 text-secondary">{categoria} | {duracion}min</p>
                    <p className="text-left m-0">Dir. {director}</p>
                    <br/>
                    <h6 className="text-left">Protagonistas:</h6>
                    <ul className="text-left pl-4">{protagonistas.map((actor) => <li>{actor}</li>)}</ul>
                    <Button variant="info" className="mr-2 mt-1 mb-2" onClick={() => {this.setState({content: "edit"})}}><i class="fa-solid fa-pen"></i></Button>
                    <Button variant="danger" className="mt-1 mb-2" onClick={() => {/* borrar */}}><i class="fa-solid fa-trash"></i></Button>
                </Container>
            </Card>
        )
    }

    content() {
        const peliculas = [{ nombre: "Hunger Games", categoria: "Acción", duracion: "120", director: "Suzanne Collins", protagonistas: ["Jennifer Lawrence", "Josh Hutcherson", "Liam Hemsworth"] }, { nombre: "Hunger Games", categoria: "Acción", duracion: "120", director: "Suzanne Collins", protagonistas: ["Jennifer Lawrence", "Josh Hutcherson", "Liam Hemsworth"] }, { nombre: "Hunger Games", categoria: "Acción", duracion: "120", director: "Suzanne Collins", protagonistas: ["Jennifer Lawrence", "Josh Hutcherson", "Liam Hemsworth"] }, { nombre: "Hunger Games", categoria: "Acción", duracion: "120", director: "Suzanne Collins", protagonistas: ["Jennifer Lawrence", "Josh Hutcherson", "Liam Hemsworth"] }, { nombre: "Hunger Games", categoria: "Acción", duracion: "120", director: "Suzanne Collins", protagonistas: ["Jennifer Lawrence", "Josh Hutcherson", "Liam Hemsworth"] }, { nombre: "Hunger Games", categoria: "Acción", duracion: "120", director: "Suzanne Collins", protagonistas: ["Jennifer Lawrence", "Josh Hutcherson", "Liam Hemsworth"] }];
        if (this.state.content === "catalog")
            return (
                <>
                    <Row className="mt-5 mb-1">
                        <Col>
                            <h3>Catálogo completo</h3>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        {peliculas.map((pelicula) => <Col xs={12} sm={6} md={6} lg={4} xl={3} className="mb-3">
                            {this.peliculaCard(pelicula.nombre, pelicula.categoria, pelicula.duracion, pelicula.director, pelicula.protagonistas)}
                        </Col>)}
                    </Row>
                </>
            )
        if (this.state.content === "search")
            return (
                <>
                    <Row className="mt-5 mb-1">
                        <Col>
                            <h3>Resultados de la búsqueda</h3>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        {peliculas.map((pelicula) => <Col xs={12} sm={6} md={6} lg={4} xl={3} className="mb-3">
                        {this.peliculaCard(pelicula.nombre, pelicula.categoria, pelicula.duracion, pelicula.director, pelicula.protagonistas)}
                        </Col>)}
                    </Row>
                </>
            )
        if (this.state.content === "add")
            return (
                <>
                    <Row className="mt-5 mb-1">
                        <Col>
                            <h3>Agregar película</h3>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <Form>
                                <Form.Group className="mb-3" controlId="addTitulo">
                                    <Form.Label>Título</Form.Label>
                                    <Form.Control type="text" placeholder="The Hunger Games" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="addDuracion">
                                    <Form.Label>Duración en minutos</Form.Label>
                                    <Form.Control type="number" placeholder="120" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="addCategoria">
                                    <Form.Label>Categoría</Form.Label>
                                    <br />
                                    <Form.Select className="pr-5 py-2">
                                        <option>Seleccionar</option>
                                        <option value="1">Terror</option>
                                        <option value="2">Amor</option>
                                        <option value="3">Acción</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="addTitulo">
                                    <Form.Label>Director</Form.Label>
                                    <Form.Control type="text" placeholder="Suzanne Collins" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="addProtagonsitas">
                                    <Form.Label className="mb-0">Protagonistas</Form.Label>
                                    <Form.Text className="text-muted mt-0 mb-1">
                                        Ingresa los nombres de los actores, separados por commas ","
                                    </Form.Text>
                                    <Form.Control as="textarea" rows={3} type="text" placeholder="Jennifer Lawrence, Josh Hutcherson, Liam Hemsworth" />
                                </Form.Group>

                                <Button variant="warning" type="submit">
                                    Enviar
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </>
            )
        if (this.state.content === "edit")
            return (
                <>
                    <Row className="mt-5 mb-1">
                        <Col>
                            <h3>Editar película</h3>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <Form>
                                <Form.Group className="mb-3" controlId="editTitulo">
                                    <Form.Label>Título</Form.Label>
                                    <Form.Control type="text" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="editDuracion">
                                    <Form.Label>Duración en minutos</Form.Label>
                                    <Form.Control type="number" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="editCategoria">
                                    <Form.Label>Categoría</Form.Label>
                                    <br />
                                    <Form.Select className="pr-5 py-2">
                                        <option>Seleccionar</option>
                                        <option value="1">Terror</option>
                                        <option value="2">Amor</option>
                                        <option value="3">Acción</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="editTitulo">
                                    <Form.Label>Director</Form.Label>
                                    <Form.Control type="text" />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="editProtagonsitas">
                                    <Form.Label className="mb-0">Protagonistas</Form.Label>
                                    <Form.Text className="text-muted mt-0 mb-1">
                                        Ingresa los nombres de los actores, separados por commas ","
                                    </Form.Text>
                                    <Form.Control as="textarea" rows={3} type="text" />
                                </Form.Group>

                                <Button variant="warning" type="submit">
                                    Enviar
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </>
            )
    }

    render() {
        return (
            <>
            <Navbar bg="info" sticky="top">
        <Container>
          <Navbar.Brand onClick={() => {this.setState({content: "catalog"})}}>
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="logo"
            /><p className="d-inline-block ml-2 font-weight-bold m-0 text-white">
              <span className="p-0">P</span>
              <span className="p-0 text-warning">ELI</span>
              <span className="p-0">CULAS</span></p>
          </Navbar.Brand>
        </Container>
      </Navbar>
            <Container>
                <Row className="mt-5 align-items-center justify-content-between">
                    <Col xs={12} sm={12} md={12} lg={6} xl={7}>
                        <h1 className="font-weight-bold mt-2 mb-0" onClick={() => {this.setState({content: "catalog"})}}>
                            <span className="p-0">P</span>
                            <span className="p-0 text-warning">ELI</span>
                            <span className="p-0">CULAS</span></h1>
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={6} xl={5} className="float-right text-right">
                        <Button variant="info" className="mr-2 mt-2" onClick={() => {this.setState({content: "add"})}}><i class="fa-solid fa-plus"></i> Agregar</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form>
                            <Row className="align-items-end">
                                <Col xs={6} sm={6} md={6} lg={5} xl={4}>
                                    <Form.Group className="mt-3" controlId="search">
                                        <Form.Label>¿Buscas algo en específico?</Form.Label>
                                        <Form.Control type="text" placeholder="Título, director..." />
                                    </Form.Group>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={2} xl={2}>
                                    <Button variant="warning" /* type="submit" */ onClick={() => {this.setState({content: "search"})}}>
                                        Buscar
                                    </Button>
                                </Col>
                                <Col xs={6} sm={6} md={6} lg={5} xl={6}>
                                    <Form.Group className="mt-3" controlId="search">
                                        <Form.Label>Seleccionar una categoría</Form.Label>
                                        <br />
                                        <Form.Select className="pr-5 py-2">
                                        <option>Seleccionar</option>
                                        <option value="1">Terror</option>
                                        <option value="2">Amor</option>
                                        <option value="3">Acción</option>
                                    </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
                {this.content()}
                <br />
                <br />
                <br />
                <br />
                <br />
            </Container>
            </>
        );
    }

}

export default Home;

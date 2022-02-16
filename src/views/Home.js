import React, { Component } from "react";
import { Container, Row, Col, Button, Form, Card, Navbar, Modal } from "react-bootstrap";
import logo from "../white.png";
import axios from "axios";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "catalog",
            nombre: "",
            categoria: undefined,
            duracion: undefined,
            director: "",
            protagonistas: "",
            peliculaID: -1,
            categoriaSearch: undefined,
            peliculas: []
                /*[ { id: 1, nombre: "Hunger Games", categoria: 2, duracion: 120, director: "Suzanne Collins", protagonistas: ["Jennifer Lawrence", "Josh Hutcherson", "Liam Hemsworth"] },
                { id: 2, nombre: "Harry Potter", categoria: 3, duracion: 120, director: "JK Rowling", protagonistas: ["Daniel Radcliffe", "Emma Watson", "Rupert Grint"] },
                { id: 3, nombre: "Catching Fire", categoria: 3, duracion: 120, director: "Suzanne Collins", protagonistas: ["Jennifer Lawrence", "Josh Hutcherson", "Liam Hemsworth"] },
                { id: 4, nombre: "Mean Girls", categoria: 2, duracion: 120, director: "Tina Fey", protagonistas: ["Rachel McAdams", "Lindsay Lohan", "Amanda Seyfried"] },
                { id: 5, nombre: "Mockingjay", categoria: 3, duracion: 120, director: "Suzanne Collins", protagonistas: ["Jennifer Lawrence", "Josh Hutcherson", "Liam Hemsworth"] },
                { id: 6, nombre: "Divergent", categoria: 1, duracion: 120, director: "Veronica Roth", protagonistas: ["Shailene Woodley", "Theo James", "Ansel Elgort"] } ]*/,
            searchResults: [],
            search: "",
            categorias: [
                { id: 1, descripcion: "Terror" },
                { id: 2, descripcion: "Amor" },
                { id: 3, descripcion: "Acción" }
            ],
            show: false,
            maxPeliculas: undefined,
            maxSearchResults: undefined,
            maxShow: 12,
            perPage: 12
        };
    }

    componentDidMount() {
        this.getPeliculas();
    }

    async getPeliculas() {
        let peliculasBD = await axios.get("http://localhost:8080/catalog");
        let peliculas = [];
        let ids = [];
        peliculasBD.data.forEach((peliBD) => {
            if (ids.includes(peliBD.id)) {
                peliculas.forEach((peli) => {
                    if (peli.id === peliBD.id) {
                        peli.protagonistas.push(peliBD.Actor);
                    }
                })
            } else {
                ids.push(peliBD.id);
                let arr = [];
                arr.push(peliBD.Actor);
                peliculas.push(
                    {
                        id: peliBD.id,
                        nombre: peliBD.Nombre,
                        duracion: peliBD.Duracion,
                        director: peliBD.Director,
                        categoria: peliBD.Categoria,
                        protagonistas: arr
                    });
            }
        })
        peliculas.sort(this.sortTitulos);
        this.setState({ peliculas: peliculas, maxPeliculas: peliculas.length })
    }

    sortTitulos(a, b) {
        if (a.nombre.toLowerCase() < b.nombre.toLowerCase()) {
            return -1;
        }
        if (a.nombre.toLowerCase() > b.nombre.toLowerCase()) {
            return 1;
        }
        return 0;
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleClose() {
        this.setState({ show: false });
    }

    peliculaCard(nombre, categoria, duracion, director, protagonistas, id) {
        return (
            <Card className="p-2 h-100">
                <Container fluid={true} className="h-100">
                    <h4 className="text-left mb-0 mt-2 text-dark font-weight-bold">{nombre}</h4>
                    <p className="text-left mb-1 text-secondary">{this.state.categorias[categoria - 1].descripcion} | {duracion}min</p>
                    <p className="text-left m-0">Dir. {director}</p>
                    <br />
                    <h6 className="text-left">Protagonistas:</h6>
                    <ul className="text-left pl-4">{protagonistas.slice(0, 5).map((actor, key) => <li key={key}>{actor}</li>)}</ul>
                    <Button variant="info" className="mr-2 mt-1 mb-2" onClick={() => { this.setState({ content: "edit", nombre: nombre, categoria: categoria.toString(), duracion: duracion, director: director, protagonistas: protagonistas.toString(), peliculaID: id }) }}><i className="fa-solid fa-pen"></i></Button>
                    <Button variant="danger" className="mt-1 mb-2" onClick={() => { this.handleShow(); this.setState({ peliculaID: id }); }}><i className="fa-solid fa-trash"></i></Button>
                </Container>
            </Card>
        )
    }

    showPeliculas() {
        return (
            <>{this.state.peliculas.slice(0, this.state.maxShow).map((pelicula, key) =>
            <Col xs={12} sm={6} md={6} lg={4} xl={3} className="mb-3" key={key}>
                {this.peliculaCard(pelicula.nombre, pelicula.categoria, pelicula.duracion, pelicula.director, pelicula.protagonistas, pelicula.id)}
            </Col>)}</>
        )
    }

    showSearchResults() {
        return (
            <>{this.state.searchResults.slice(0, this.state.maxShow).map((pelicula, key) =>
            <Col xs={12} sm={6} md={6} lg={4} xl={3} className="mb-3" key={key}>
                    {this.peliculaCard(pelicula.nombre, pelicula.categoria, pelicula.duracion, pelicula.director, pelicula.protagonistas, pelicula.id)}
            </Col>)}</>
        )
    }

    content() {
        if (this.state.content === "catalog")
            return (
                <>
                    <Row className="mt-5 mb-1">
                        <Col>
                            <h3>Catálogo completo</h3>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        {this.showPeliculas()}
                    </Row>
                    {this.state.maxShow < this.state.maxPeliculas ? 
                    <>
                    <Row className="mt-2">
                        <Col xs={12} className="d-flex justify-content-center">
                            <Button variant="warning" className="mr-2 mt-2" onClick={() => { this.setState({ maxShow: this.state.maxShow+this.state.perPage }) }}>
                                <i class="fa-solid fa-chevron-down"></i> Ver más
                            </Button>
                        </Col>
                    </Row>
                    </> : <></>}
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
                        {this.showSearchResults()}
                    </Row>
                    {this.state.maxShow < this.state.maxSearchResults ? 
                    <>
                    <Row className="mt-2">
                        <Col xs={12} className="d-flex justify-content-center">
                            <Button variant="warning" className="mr-2 mt-2" onClick={() => { this.setState({ maxShow: this.state.maxShow+this.state.perPage }) }}>
                                <i class="fa-solid fa-chevron-down"></i> Ver más
                            </Button>
                        </Col>
                    </Row>
                    </> : <></>}
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
                            <Form onSubmit={(e) => e.preventDefault()}>
                                <Form.Group className="mb-3" controlId="addTitulo">
                                    <Form.Label>Título</Form.Label>
                                    <Form.Control type="text" placeholder="ej. The Hunger Games" value={this.state.nombre} onChange={e => this.setState({ nombre: e.target.value })} maxLength={70} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="addDuracion">
                                    <Form.Label>Duración en minutos</Form.Label>
                                    <Form.Control type="number" placeholder="ej. 120" value={this.state.duracion} onChange={e => this.setState({ duracion: e.target.value })} min={0} max={5220} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="addCategoria">
                                    <Form.Label>Categoría</Form.Label>
                                    <br />
                                    <Form.Select className="pr-5 py-2" value={this.state.categoria} onChange={e => this.setState({ categoria: e.target.value })}>
                                        <option>Seleccionar</option>
                                        <option value={1}>Terror</option>
                                        <option value={2}>Amor</option>
                                        <option value={3}>Acción</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="addTitulo">
                                    <Form.Label>Director</Form.Label>
                                    <Form.Control type="text" placeholder="ej. Suzanne Collins" value={this.state.director} onChange={e => this.setState({ director: e.target.value })} maxLength={70} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="addProtagonsitas">
                                    <Form.Label className="mb-0">Protagonistas</Form.Label>
                                    <Form.Text className="text-muted mt-0 mb-1">
                                        Ingresa los nombres de los actores, separados por commas ","
                                    </Form.Text>
                                    <Form.Control as="textarea" rows={3} type="text" placeholder="ej. Jennifer Lawrence, Josh Hutcherson, Liam Hemsworth" value={this.state.protagonistas} onChange={e => this.setState({ protagonistas: e.target.value })} />
                                </Form.Group>

                                <Button variant="warning" type="submit" onClick={() => { this.onSubmitAdd(this.state.peliculaID); }}>
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
                            <Form onSubmit={(e) => e.preventDefault()}>
                                <Form.Group className="mb-3" controlId="editTitulo">
                                    <Form.Label>Título</Form.Label>
                                    <Form.Control type="text" value={this.state.nombre} onChange={e => this.setState({ nombre: e.target.value })} maxLength={70} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="editDuracion">
                                    <Form.Label>Duración en minutos</Form.Label>
                                    <Form.Control type="number" value={this.state.duracion} onChange={e => this.setState({ duracion: e.target.value })} min={0} max={5220} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="editCategoria">
                                    <Form.Label>Categoría</Form.Label>
                                    <br />
                                    <Form.Select className="pr-5 py-2" value={this.state.categoria} onChange={e => this.setState({ categoria: e.target.value })}>
                                        <option>Seleccionar</option>
                                        <option value={1}>Terror</option>
                                        <option value={2}>Amor</option>
                                        <option value={3}>Acción</option>
                                    </Form.Select>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="editTitulo">
                                    <Form.Label>Director</Form.Label>
                                    <Form.Control type="text" value={this.state.director} onChange={e => this.setState({ director: e.target.value })} maxLength={70} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="editProtagonsitas">
                                    <Form.Label className="mb-0">Protagonistas</Form.Label>
                                    <Form.Text className="text-muted mt-0 mb-1">
                                        Ingresa los nombres de los actores, separados por commas ","
                                    </Form.Text>
                                    <Form.Control as="textarea" rows={3} type="text" value={this.state.protagonistas} onChange={e => this.setState({ protagonistas: e.target.value })} />
                                </Form.Group>

                                <Button variant="warning" type="submit" onClick={() => { this.onSubmitEdit(this.state.peliculaID); }}>
                                    Enviar
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </>
            )
    }

    search() {
        let searchResults = [];
        this.state.peliculas.forEach((pelicula) => {
            if (pelicula.nombre.toLowerCase().includes(this.state.search.toLowerCase())) {
                searchResults.push(pelicula)
            } else if (pelicula.director.toLowerCase().includes(this.state.search.toLowerCase())) {
                searchResults.push(pelicula)
            }
        })
        this.setState({ maxSearchResults: searchResults.length });
        return searchResults;
    }

    searchCategoria(value) {
        let categoriaResults = [];
        this.state.peliculas.forEach((pelicula) => {
            if (pelicula.categoria.toString() === value) {
                categoriaResults.push(pelicula)
            }
        })
        this.setState({ maxSearchResults: categoriaResults.length });
        return categoriaResults;
    }

    editPelicula(id) {
        let arr = this.state.protagonistas.split(",").map((actor) => { return actor.trim() });
        this.state.peliculas.forEach((pelicula) => {
            if (pelicula.id === id) {
                pelicula.nombre = this.state.nombre;
                pelicula.duracion = this.state.duracion;
                pelicula.categoria = this.state.categoria;
                pelicula.director = this.state.director;
                pelicula.protagonistas = arr;
            }
        })
    }

    addPelicula() {
        let arr = this.state.protagonistas.split(",").map((actor) => { return actor.trim() });
        this.state.peliculas.push({
            id: this.state.peliculas.length,
            nombre: this.state.nombre,
            duracion: this.state.duracion,
            categoria: this.state.categoria,
            director: this.state.director,
            protagonistas: arr
        })
    }

    deletePelicula(id) {
        this.state.peliculas.forEach((pelicula, index) => {
            if (pelicula.id === id) {
                this.state.peliculas.splice(index, 1);
            }
        })
    }

    async onSubmitSearch() {
        let searchResults = await this.search();
        this.setState({ searchResults: searchResults, content: "search", categoriaResults: "" });
    }

    async onSubmitCategoria(value) {
        if (value === "-1") {
            this.setState({ content: "catalog" })
            return;
        }
        let categoriaResults = await this.searchCategoria(value);
        this.setState({ searchResults: categoriaResults });
        this.setState({ content: "search" })
    }

    async onSubmitEdit(id) {
        let pelicula = {
            nombre: this.state.nombre,
            categoria: this.state.categoria,
            duracion: this.state.duracion,
            director: this.state.director,
            id: id
        };
        let response1 = await axios.post('http://localhost:8080/editPelicula', pelicula);

        let arr = this.state.protagonistas.split(",").map((actor) => { return actor.trim().replace("\n", " ").replaceAll("\n", "") });

        let pid = {
            peliculaID: id
        }
        let response2 = await axios.post('http://localhost:8080/resetActores', pid);


        arr.forEach(async (actor) => {
            let protagonista = {
                peliculaID: id,
                actor: actor
            }
            let response3 = await axios.post('http://localhost:8080/editActores', protagonista);
        })

        this.componentDidMount();
        this.setState({ content: "catalog", nombre: "", categoria: undefined, duracion: undefined, director: "", protagonistas: "", peliculaID: -1 });
    }

    async onSubmitAdd() {
        /* let arr = this.state.protagonistas.split(",").map((actor) => { return actor.trim().replace("\n", " ").replaceAll("\n", "") });
        console.log(arr); */
        let pelicula = {
            nombre: this.state.nombre,
            categoria: this.state.categoria,
            duracion: this.state.duracion,
            director: this.state.director
        };
        let response1 = await axios.post('http://localhost:8080/addPelicula', pelicula);

        let arr = this.state.protagonistas.split(",").map((actor) => { return actor.trim().replace("\n", " ").replaceAll("\n", "") });
        arr.forEach(async (actor) => {
            let protagonista = {
                actor: actor
            }
            let response2 = await axios.post('http://localhost:8080/addActores', protagonista);
        })

        this.componentDidMount();
        this.setState({ content: "catalog", nombre: "", categoria: undefined, duracion: undefined, director: "", protagonistas: "" });
    }

    async onSumbitDelete(id) {
        let pid = {
            peliculaID: id
        }
        let response1 = await axios.post('http://localhost:8080/deletePelicula', pid);
        /* this.handleClose; */

        this.componentDidMount();
        this.setState({ content: "catalog" });
    }

    render() {
        return (
            <>
                <Navbar bg="info" sticky="top">
                    <Container>
                        <Navbar.Brand onClick={() => { this.setState({ content: "catalog", search: "", categoriaSearch: "" }) }}>
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
                            <h1 className="font-weight-bold mt-2 mb-0" onClick={() => { this.setState({ content: "catalog", search: "", categoriaSearch: "" }) }}>
                                <span className="p-0">P</span>
                                <span className="p-0 text-warning">ELI</span>
                                <span className="p-0">CULAS</span></h1>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={6} xl={5} className="float-right text-right">
                            <Button variant="info" className="mr-2 mt-2" onClick={() => { this.setState({ content: "add" }) }}><i className="fa-solid fa-plus"></i> Agregar</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form onSubmit={(e) => e.preventDefault()}>
                                <Row className="align-items-end">
                                    <Col xs={6} sm={6} md={6} lg={5} xl={4}>
                                        <Form.Group className="mt-3" controlId="search">
                                            <Form.Label>¿Buscas algo en específico?</Form.Label>
                                            <Form.Control type="text" placeholder="Título, director..." value={this.state.search} onChange={e => this.setState({ search: e.target.value })} maxLength={100} />
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6} sm={6} md={6} lg={2} xl={2}>
                                        <Button variant="warning" type="submit" onClick={() => { this.onSubmitSearch(); }}>
                                            Buscar
                                        </Button>
                                    </Col>
                                    <Col xs={6} sm={6} md={6} lg={5} xl={6}>
                                        <Form.Group className="mt-3" controlId="search">
                                            <Form.Label>Seleccionar una categoría</Form.Label>
                                            <br />
                                            <Form.Select className="pr-5 py-2" value={this.state.categoriaSearch} onChange={e => { this.onSubmitCategoria(e.target.value) }} >
                                                <option value={-1}>Seleccionar</option>
                                                <option value={1}>Terror</option>
                                                <option value={2}>Amor</option>
                                                <option value={3}>Acción</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                    {this.content()}
                    <Modal show={this.state.show} onHide={() => { this.handleClose(); this.setState({ peliculaID: -1 }); }}>
                        <Modal.Header closeButton>
                            <Modal.Title>¿Estás seguro que lo quieres eliminar?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Esta acción no se puede deshacer</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => { this.handleClose(); this.setState({ peliculaID: -1 }); }}>
                                Cancelar
                            </Button>
                            <Button variant="danger" onClick={() => { this.onSumbitDelete(this.state.peliculaID); this.handleClose(); }}>
                                Eliminar
                            </Button>
                        </Modal.Footer>
                    </Modal>
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

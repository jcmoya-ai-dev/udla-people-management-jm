import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
    Person,
    PersonInput,
    createPerson,
    updatePerson,
    deletePerson,
    filterPersons,
    getPersonsPaged,
} from '../../services/personService';
import PersonFormModal from './PersonFormModal';
import { toast } from 'react-toastify';

function PersonList() {
    // Estados
    const [persons, setPersons] = useState<Person[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [editingPerson, setEditingPerson] = useState<Person | undefined>(undefined);

    // Filtros
    const [nameFilter, setNameFilter] = useState('');
    const [genderFilter, setGenderFilter] = useState('');
    const [emailFilter, setEmailFilter] = useState('');
    const [ageFilter, setAgeFilter] = useState<number | undefined>(undefined);

    // Paginación
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 5;

    useEffect(() => {
        loadPagedPersons(currentPage, pageSize);
    }, [currentPage]);
    
    async function loadPagedPersons(page: number, pageSize: number) {
        try {
            const data = await getPersonsPaged(page, pageSize);
            if (data.totalPages == 0) {
                setTotalPages(1);
            } else {
                setTotalPages(data.totalPages);
            }
            setPersons(data.items);
        } catch (error) {
            console.error(error);
            toast.error('Error al cargar personas paginadas');
        }
    }
    
    async function handleFilter() {
        try {
            const data = await filterPersons(nameFilter, genderFilter, emailFilter, ageFilter);
            setPersons(data);
        } catch (error) {
            console.error(error);
            toast.error('Error al filtrar personas');
        }
    }

    async function handleDelete(id: number) {
        if (!window.confirm('¿Desea eliminar esta persona?')) return;
        try {
            await deletePerson(id);
            toast.success('Persona eliminada exitosamente');
            loadPagedPersons(currentPage, pageSize);
        } catch (error) {
            console.error(error);
            toast.error('Error al eliminar persona');
        }
    }

    function openAddModal() {
        setEditingPerson(undefined);
        setShowModal(true);
    }

    function openEditModal(person: Person) {
        setEditingPerson(person);
        setShowModal(true);
    }

    function closeModal() {
        setShowModal(false);
    }

    async function handleSave(inputData: PersonInput) {
        try {
            if (editingPerson) {
                await updatePerson(editingPerson.id, inputData);
                toast.success('Persona editada exitosamente');
            } else {
                const newPerson = await createPerson(inputData);
                toast.success(`Persona creada con id ${newPerson.id}`);
            }
            setShowModal(false);
            loadPagedPersons(currentPage, pageSize);
        } catch (error) {
            console.error(error);
            toast.error('Error al guardar la persona');
        }
    }

    function goToNextPage() {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    }
    function goToPrevPage() {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    }

    return (
        <Container className="center-screen">
            <div className="w-75">
                <h2 className="text-center mb-4">Lista de Personas</h2>

                <Form className="mb-3">
                    <Row>
                        <Col md={3}>
                            <Form.Group>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={nameFilter}
                                    onChange={(e) => setNameFilter(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={2}>
                            <Form.Group>
                                <Form.Label>Género</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={genderFilter}
                                    onChange={(e) => setGenderFilter(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group>
                                <Form.Label>Correo</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={emailFilter}
                                    onChange={(e) => setEmailFilter(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={2}>
                            <Form.Group>
                                <Form.Label>Edad</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={ageFilter ?? ''}
                                    onChange={(e) => setAgeFilter(parseInt(e.target.value, 10))}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={2} className="d-flex align-items-end">
                            <Button variant="primary" onClick={handleFilter}>
                                Filtrar
                            </Button>
                        </Col>
                    </Row>
                </Form>

                <Button variant="success" onClick={openAddModal}>
                    Añadir Persona
                </Button>

                <br></br>
                <br></br>

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Género</th>
                            <th>Edad</th>
                            <th>Dirección</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {persons.map((p) => (
                            <tr key={p.id}>
                                <td>{p.name}</td>
                                <td>{p.email}</td>
                                <td>{p.gender ?? ''}</td>
                                <td>{p.age}</td>
                                <td>{p.direction}</td>
                                <td>
                                    <Button variant="info" size="sm" onClick={() => openEditModal(p)}>
                                        Editar
                                    </Button>{' '}
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(p.id)}>
                                        Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <div className="d-flex justify-content-between align-items-center">
                    <Button
                        variant="outline-primary"
                        disabled={currentPage === 1}
                        onClick={goToPrevPage}
                    >
                        Anterior
                    </Button>
                    <span>Página {currentPage} de {totalPages}</span>
                    <Button
                        variant="outline-primary"
                        disabled={currentPage === totalPages}
                        onClick={goToNextPage}
                    >
                        Siguiente
                    </Button>
                </div>

                <br></br>

                <Link to="/">
                    <Button variant="outline-secondary">Regresar al menú principal</Button>
                </Link>

            </div>

            <PersonFormModal
                show={showModal}
                onClose={closeModal}
                onSave={handleSave}
                initialData={editingPerson}
            />
        </Container>
    );
}

export default PersonList;

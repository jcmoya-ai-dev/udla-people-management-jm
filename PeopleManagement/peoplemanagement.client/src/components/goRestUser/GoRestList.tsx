import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify/unstyled';

interface GoRestUser {
    id: number;
    name: string;
    email: string;
    gender: string;
    status: string;
}

interface PaginatedGoRest {
    items: GoRestUser[];
    totalPages: number;
}

function GoRestList() {

    const API_URL = 'https://localhost:7037/api';
    const CONTROLLER = 'GoRest/users';

    const [users, setUsers] = useState<GoRestUser[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 5;

    useEffect(() => {
        loadGoRestPaged(currentPage, pageSize);
    }, [currentPage]);

    async function loadGoRestPaged(page: number, pageSize: number) {
        try {
            const response = await fetch(`${API_URL}/${CONTROLLER}/paged?page=${page}&pageSize=${pageSize}`);
            if (!response.ok) {

                if (response.status === 503) {
                    const message = 'Servicio no disponible (503).';
                    toast.error(message);
                    throw new Error(message);
                } else if (response.status === 504) {
                    const message = 'Timeout al conectar con GoRest (504).';
                    toast.error(message);
                    throw new Error(message);
                } else if (response.status === 500) {
                    const message = 'Error interno en el servidor (500).';
                    toast.error(message);
                    throw new Error(message);
                } else {
                    const message = 'Error al obtener GoRest paginado';
                    toast.error(message);
                    throw new Error(message);
                }
            }
            const data: PaginatedGoRest = await response.json();
            setUsers(data.items);
            setTotalPages(data.totalPages);
        } catch (error: any) {
            console.error(error);
            toast.error(error.message || 'Error al cargar usuarios de GoRest');
        }
    }

    function goToNextPage() {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    }
    function goToPrevPage() {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    }

    return (
        <Container className="center-screen">
            <div className="w-175">
                <h2 className="text-center mb-4">Usuarios de GoRest</h2>

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Género</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u => (
                            <tr key={u.id}>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.gender}</td>
                                <td>{u.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                <div className="d-flex justify-content-between align-items-center mb-3">
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

                <Link to="/">
                    <Button variant="outline-secondary">Regresar al menú principal</Button>
                </Link>
            </div>
        </Container>
    );
}

export default GoRestList;

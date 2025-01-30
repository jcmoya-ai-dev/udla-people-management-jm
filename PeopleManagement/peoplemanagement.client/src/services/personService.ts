const API_URL = 'https://localhost:7037/api';
const CONTROLLER = 'persons';

export async function getAllPersons(): Promise<Person[]> {
    const response = await fetch(`${API_URL}/${CONTROLLER}`);
    if (!response.ok) throw new Error('Error al obtener personas');
    return response.json();
}

export async function createPerson(input: PersonInput): Promise<Person> {
    const response = await fetch(`${API_URL}/${CONTROLLER}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
    });
    if (!response.ok) throw new Error('Error al crear persona');
    return response.json();
}

export async function updatePerson(id: number, input: PersonInput): Promise<void> {
    const response = await fetch(`${API_URL}/${CONTROLLER}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
    });
    if (!response.ok) throw new Error('Error al actualizar persona');
}

export async function deletePerson(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/${CONTROLLER}/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al eliminar persona');
}

export async function filterPersons(
    name?: string,
    gender?: string,
    email?: string,
    age?: number,
): Promise<Person[]> {
    const params = new URLSearchParams();
    if (name) params.append('Name', name);
    if (gender) params.append('Gender', gender);
    if (email) params.append('Email', email);
    if (age !== undefined && !Number.isNaN(age)) {
        params.append('Age', String(age));
    }

    const response = await fetch(`${API_URL}/${CONTROLLER}/filter?${params.toString()}`);
    if (!response.ok) throw new Error('Error al filtrar personas');
    return response.json();
}

export async function getPersonsPaged(page: number, pageSize: number): Promise<PaginatedResponse<Person>> {
    const response = await fetch(`${API_URL}/${CONTROLLER}/paged?page=${page}&pageSize=${pageSize}`);
    if (!response.ok) throw new Error('Error al obtener personas paginadas');
    return response.json();
}

export interface PaginatedResponse<T> {
    items: T[];
    totalPages: number;
}


export interface Person {
    id: number;
    name: string;
    email: string;
    gender: string;
    age: number;
    direction: string;
    status: string;
}

export interface PersonInput {
    name: string;
    email: string;
    gender: string;
    age: number;
    direction: string;
    status: "active";
}
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Person, PersonInput } from '../../services/personService';
import { toast } from 'react-toastify';

interface PersonFormModalProps {
    show: boolean;
    onClose: () => void;
    onSave: (personData: PersonInput) => void;
    initialData?: Person;
}

function PersonFormModal({
    show,
    onClose,
    onSave,
    initialData,
}: PersonFormModalProps) {
    const [formData, setFormData] = useState<PersonInput>({
        name: '',
        email: '',
        gender: '',
        age: 0,
        direction: '',
        status: 'active'
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name,
                email: initialData.email,
                gender: initialData.gender || '',
                age: initialData.age,
                direction: initialData.direction,
                status: 'active'
            });
        } else {
            setFormData({
                name: '',
                email: '',
                gender: '',
                age: 0,
                direction: '',
                status: 'active'
            });
        }
    }, [initialData]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit() {
        // Validaciones
        if (!formData.name) {
            toast.warn('El nombre es obligatorio');
            return;
        }
        if (!formData.email) {
            toast.warn('El correo es obligatorio');
            return;
        }
        if(!formData.email.includes('@')) {
            toast.warn('Correo inválido: debe contener @');
            return;
        }        
        
        if (!formData.gender) {
            toast.warn('Debe seleccionar un género');
            return;
        }
        
        if (formData.age < 1 || formData.age > 120) {
            toast.warn('La edad debe estar entre 1 y 120');
            return;
        }

        if (!formData.direction) {
            toast.warn('La dirección es obligatoria');
            return;
        }

        onSave(formData);
    }

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>{initialData ? 'Editar Persona' : 'Nueva Persona'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Correo Electrónico</Form.Label>
                        <Form.Control
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Género</Form.Label>
                        <Form.Select
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <option value="">Seleccione género</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                            <option value="Otro">Otro</option>
                            <option value="Prefiero no especificar">Prefiero no especificar</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Edad</Form.Label>
                        <Form.Control
                            name="age"
                            type="number"
                            value={formData.age}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control
                            name="direction"
                            type="text"
                            value={formData.direction}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Guardar
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default PersonFormModal;

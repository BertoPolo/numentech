import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Button, Form, ListGroup, Modal } from "react-bootstrap"
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import MyNavbar from './Navbar';

const Home = () => {
    const [tasks, setTasks] = useState([])
    const isUserRegistered = localStorage.getItem('accessToken')
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const getTasks = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER}tasks`);
            const data = await response.json();

            if (data) setTasks(data);
            else console.error("no tasks found")

        } catch (error) {
            console.log(error)
        }
    }

    const createNewTask = async (e) => {
        e.preventDefault();
        const title = e.target.title.value
        const task = e.target.task.value
        const createdBy = localStorage.getItem('selfAccount')

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER}tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify({ title, task, createdBy })
            });

            if (response.ok) {
                getTasks()
            }
        } catch (error) {
            console.error('Error al crear la tarea:', error);
        }
    };

    const editTask = () => { }

    const handleEditClick = (task) => {
        setSelectedTask(task);
        setShowEditModal(true);
    };

    const handleDeleteClick = (task) => {
        setSelectedTask(task);
        setShowDeleteModal(true);
    };

    // modal closings
    const handleCloseEditModal = () => setShowEditModal(false);
    const handleCloseDeleteModal = () => setShowDeleteModal(false);


    useEffect(() => {
        getTasks()
    }, [])

    console.log(tasks)

    return (
        <>
            <MyNavbar />
            <Container>
                <h1 className="my-4">Lista de Tareas</h1>
                <ListGroup>
                    {tasks && tasks.map((task, index) => (
                        <ListGroup.Item key={task._id} className="d-flex justify-content-between align-items-start">
                            <div>
                                <h5>{task.title}</h5>
                                <p>{task.task}</p>
                                <p>Creado por: {task.createdBy} - {new Date(task.createdAt).toLocaleString()}</p>
                            </div>
                            {isUserRegistered &&
                                <div>
                                    <PencilSquare onClick={() => handleEditClick(task)} className="me-2" style={{ cursor: 'pointer' }} />
                                    <Trash onClick={() => handleDeleteClick(task)} style={{ cursor: 'pointer' }} />
                                </div>
                            }
                        </ListGroup.Item>
                    ))}
                </ListGroup>

                {isUserRegistered && (
                    <Form onSubmit={createNewTask} className="mt-4">
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Título</Form.Label>
                                    <Form.Control name="title" type="text" placeholder="Título" required maxLength="20" />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Descripción de la tarea</Form.Label>
                                    <Form.Control name="task" type="text" placeholder="Descripción de la tarea" required maxLength="150" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button variant="primary" type="submit">Crear Tarea</Button>
                    </Form>
                )}
                {/* Edit modal */}
                <Modal show={showEditModal} onHide={handleCloseEditModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar Tarea</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={(e) => {
                        e.preventDefault();
                        editTask(e, selectedTask._id);
                    }}>
                        <Modal.Body>
                            <Form.Group className="mb-3">
                                <Form.Label>Título</Form.Label>
                                <Form.Control
                                    name="title"
                                    type="text"
                                    defaultValue={selectedTask?.title}
                                    required maxLength="20"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Descripción de la tarea</Form.Label>
                                <Form.Control
                                    name="task"
                                    as="textarea"
                                    rows={3}
                                    defaultValue={selectedTask?.task}
                                    required maxLength="150"
                                />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseEditModal}>Cerrar</Button>
                            <Button variant="primary" type="submit">Guardar Cambios</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>

                {/* Delete Modal */}
                <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Eliminar Tarea</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>¿Estás seguro de que quieres eliminar esta tarea?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDeleteModal}>Cancelar</Button>
                        <Button variant="danger">Eliminar</Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    );
}

export default Home
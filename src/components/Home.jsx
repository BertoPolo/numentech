import React, { useEffect, useState } from 'react'
import { Container, Button, Form, ListGroup, Modal } from "react-bootstrap"
import { PencilSquare, Trash, Plus } from 'react-bootstrap-icons'
import MyNavbar from './Navbar'

const Home = () => {
    const isUserRegistered = localStorage.getItem('accessToken')
    const [tasks, setTasks] = useState([])
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);

    // Array of bg colors for tasks
    const bgColors = ['bg-color-1', 'bg-color-2', 'bg-color-3', 'bg-color-4', 'bg-color-5'];

    const getTasks = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER}tasks`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
            });
            const data = await response.json();

            if (data) setTasks(data);
            else console.error("No tasks found")

        } catch (error) {
            console.log(error)
        }
    }

    const createNewTask = async (e) => {
        e.preventDefault();
        const title = e.target.title.value
        const task = e.target.task.value

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER}tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify({ title, task })
            });

            if (response.ok) {
                getTasks()
                setShowCreateModal(false)
            }
        } catch (error) {
            console.error('Error al crear la tarea:', error);
        }
    };

    const editTask = async (e) => {

        e.preventDefault();
        const title = e.target.title.value
        const task = e.target.task.value

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER}tasks/${selectedTask._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify({ title, task })
            });

            if (response.ok) {
                getTasks()
                setShowEditModal(false)
            }
        } catch (error) {
            console.error('Error al modificar la tarea:', error);
        }

    }

    const deleteTask = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER}tasks/${selectedTask._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
            });

            if (response.ok) {
                getTasks()
                setShowDeleteModal(false)
            }
        } catch (error) {
            console.error('Error al eliminar la tarea:', error);
        }

    }

    const handleEditClick = (task) => {
        setSelectedTask(task);
        setShowEditModal(true);
    };

    const handleDeleteClick = (task) => {
        setSelectedTask(task);
        setShowDeleteModal(true);
    };

    const handleClickScroll = () => {
        const element = document.getElementById('task-list');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }


    useEffect(() => {
        getTasks()
    }, [])


    return (
        <>
            <MyNavbar />

            <Container className='mb-4 ' id='task-list'>
                <div className="d-flex justify-content-between align-items-center my-4">
                    {/* <h1 id='task-list'>Task List</h1> */}
                    <span></span>
                    {isUserRegistered && (
                        <Button className="btnLogin border-0" onClick={() => setShowCreateModal(true)}>
                            <Plus className="d-inline-block d-sm-none" />
                            <span className="d-none d-sm-inline">New Task</span>
                        </Button>
                    )}
                </div>
                {/* map all the fetched tasks */}
                <ListGroup>
                    {tasks && tasks.map((task, index) => (
                        <ListGroup.Item
                            key={task._id}
                            className={`border-0 rounded d-flex flex-column justify-content-between mb-2 ${bgColors[index % bgColors.length]}`}
                        >
                            <div>
                                <h5 className='font-weight-bold'>{task.title}</h5>
                                <p>{task.task}</p>
                                <small className='text-muted'>Created: {new Date(task.createdAt).toLocaleString()}</small>
                                {/* <small className='text-muted d-block'>Updated: {new Date(task.updatedAt).toLocaleString()}</small> */}
                            </div>
                            {isUserRegistered &&
                                <div className="d-flex justify-content-end">
                                    <PencilSquare onClick={() => handleEditClick(task)} className="pointer mx-2" style={{ width: "1.2rem", height: "1.2rem" }} />
                                    <Trash onClick={() => handleDeleteClick(task)} className="pointer text-danger" style={{ width: "1.2rem", height: "1.2rem" }} />
                                </div>
                            }
                        </ListGroup.Item>
                    ))}
                </ListGroup>

                {/* MODALS */}

                {/* Create Task */}
                <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create New Task</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={(e) => createNewTask(e)}>
                        <Modal.Body>
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    name="title"
                                    type="text"
                                    placeholder="Título"
                                    required maxLength="20"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Task Description</Form.Label>
                                <Form.Control
                                    name="task"
                                    as="textarea"
                                    rows={3}
                                    placeholder="Descripción de la tarea"
                                    required maxLength="150"
                                />
                            </Form.Group>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowCreateModal(false)}>Close</Button>
                            <Button variant="primary" type="submit">Create Task</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>

                {/* Edit modal */}
                <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Task</Modal.Title>
                    </Modal.Header>

                    <Form onSubmit={(e) => {
                        e.preventDefault();
                        editTask(e, selectedTask._id);
                    }}>
                        <Modal.Body>
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    name="title"
                                    type="text"
                                    defaultValue={selectedTask?.title}
                                    required maxLength="20"
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Task Description</Form.Label>
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
                            <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
                            <Button variant="primary" type="submit">Save Changes</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>

                {/* Delete Modal */}
                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Task</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>Are you sure you want to delete this task?</Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                        <Button variant="danger" onClick={deleteTask}>Delete</Button>
                    </Modal.Footer>
                </Modal>

                <p className="pointer mt-3" onClick={handleClickScroll}>Back to top</p>
            </Container>
        </>
    );
}

export default Home
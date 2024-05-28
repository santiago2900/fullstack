import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import './Login.css';

const Logueo = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const goTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/restaurante/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('nameUser', data.usuario.username);
        setMessage({ text: 'Iniciando sesión...', type: 'success' });

        setTimeout(() => {
          setMessage({ text: 'Inicio de sesión exitoso', type: 'success' });
          redirectUser(data.usuario.rol);
        }, 1000);
      } else {
        setMessage({ text: data.mensaje || 'Error desconocido', type: 'error' });
      }
    } catch (error) {
      console.error('Error al procesar la respuesta del servidor:', error);
      setMessage({ text: 'Error interno del servidor', type: 'error' });
    }
  };

  const redirectUser = (rol) => {
    if (rol === 'mesero') {
      goTo('/perfil-mesero');
    } else if (rol === 'cocina') {
      goTo('/perfil-cocina');
    } else if (rol === 'administrador') {
      goTo('/admin');
    } else {
      setMessage({ text: 'No tienes permisos para acceder a esta página', type: 'error' });
    }
  };

  return (
    <div className="login-background">
      <Container className="d-flex justify-content-center align-items-center h-100">
        <div className="login-container">
          <Card className="p-4 shadow">
            <Card.Body>
              <Card.Title className="text-center mb-4">DeliExpress</Card.Title>
              {message.text && (
                <Alert variant={message.type === 'error' ? 'danger' : 'success'} className="text-center">
                  {message.text}
                </Alert>
              )}
              <Form onSubmit={handleLogin}>
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Usuario</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <div className="button-container">
                  <Button variant="primary" type="submit">
                    Iniciar sesión
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default Logueo;

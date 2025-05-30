import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const API_URL = 'http://localhost:8080';

const AuthDebugger = () => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const loginData = { correo, contrasena };
      console.log('Enviando:', loginData);
      
      const result = await axios.post(`${API_URL}/auth/login`, loginData);
      
      console.log('Resultado login:', result.data);
      setResponse(result.data);
      
      // Guardar token
      if (result.data.jwt) {
        localStorage.setItem('token', result.data.jwt);
        setToken(result.data.jwt);
      }
    } catch (err) {
      console.error('Error login:', err);
      setError({
        message: err.message,
        response: err.response ? {
          status: err.response.status,
          data: err.response.data
        } : null
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Depurador de Autenticación</h2>
      
      <Card className="mb-4">
        <Card.Header>Login</Card.Header>
        <Card.Body>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Correo</Form.Label>
              <Form.Control 
                type="email"
                value={correo}
                onChange={e => setCorreo(e.target.value)}
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={contrasena}
                onChange={e => setContrasena(e.target.value)}
                required
              />
            </Form.Group>
            
            <Button type="submit" disabled={loading}>
              {loading ? 'Procesando...' : 'Iniciar sesión'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
      
      {token && (
        <Card className="mb-4">
          <Card.Header>Token JWT actual</Card.Header>
          <Card.Body>
            <p style={{wordBreak: 'break-all'}}>{token}</p>
            <Button 
              variant="outline-danger" 
              onClick={() => {
                localStorage.removeItem('token');
                setToken('');
              }}
            >
              Borrar token
            </Button>
          </Card.Body>
        </Card>
      )}
      
      {error && (
        <Alert variant="danger">
          <h5>Error</h5>
          <p><strong>Mensaje:</strong> {error.message}</p>
          {error.response && (
            <>
              <p><strong>Status:</strong> {error.response.status}</p>
              <p><strong>Datos:</strong></p>
              <pre>{JSON.stringify(error.response.data, null, 2)}</pre>
            </>
          )}
        </Alert>
      )}
      
      {response && (
        <Card>
          <Card.Header>Respuesta</Card.Header>
          <Card.Body>
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default AuthDebugger;
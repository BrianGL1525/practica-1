'use client';

import { useState } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';

export default function FormularioRegistro() {
  const estadoInicial = {
    nombre: '',
    apellido: '',
    email: '',
    contraseña: '',
    edad: '',
    genero: null as boolean | null,
    rol: '',
    opciones: false,
    notas: '',
    fechaRegistro: '',
  };

  const [formulario, setFormulario] = useState(estadoInicial);

  // Estado donde guardaremos los datos cuando enviamos
  const [datosGuardados, setDatosGuardados] = useState<typeof estadoInicial | null>(null);

  const [modalAbierto, setModalAbierto] = useState(false);

  const manejarCambio = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : false;

    let nuevoValor: any;

    if (type === 'checkbox') {
      nuevoValor = checked;
    } else if (name === 'genero') {
      nuevoValor = value === 'true';
    } else {
      nuevoValor = value;
    }

    setFormulario({ ...formulario, [name]: nuevoValor });
  };

  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault();

    // Guardar la info del formulario para mostrar en modal
    setDatosGuardados(formulario);

    // Limpiar formulario
    setFormulario(estadoInicial);

    // Cerrar modal si está abierto (opcional)
    if (modalAbierto) setModalAbierto(false);

    console.log('Formulario enviado:', formulario);
  };

  const toggleModal = () => setModalAbierto(!modalAbierto);

  const reiniciarFormulario = () => {
    setFormulario(estadoInicial);
  };

  return (
    <div className="p-4">
      <h2 className="mb-4 text-primary">Formulario de Registro</h2>
      <Form onSubmit={manejarEnvio}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="nombre">Nombre</Label>
              <Input
                type="text"
                id="nombre"
                name="nombre"
                value={formulario.nombre}
                onChange={manejarCambio}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="apellido">Apellido</Label>
              <Input
                type="text"
                id="apellido"
                name="apellido"
                value={formulario.apellido}
                onChange={manejarCambio}
                required
              />
            </FormGroup>
          </Col>
        </Row>

        <FormGroup>
          <Label for="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formulario.email}
            onChange={manejarCambio}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="contraseña">Contraseña</Label>
          <Input
            type="password"
            id="contraseña"
            name="contraseña"
            value={formulario.contraseña}
            onChange={manejarCambio}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="edad">Edad</Label>
          <Input
            type="number"
            id="edad"
            name="edad"
            value={formulario.edad}
            onChange={manejarCambio}
            min="0"
            required
          />
        </FormGroup>

        <FormGroup tag="fieldset">
          <legend>Género</legend>
          <FormGroup check>
            <Input
              type="radio"
              name="genero"
              value="true"
              onChange={manejarCambio}
              checked={formulario.genero === true}
              required
            />
            <Label check>Masculino</Label>
          </FormGroup>
          <FormGroup check>
            <Input
              type="radio"
              name="genero"
              value="false"
              onChange={manejarCambio}
              checked={formulario.genero === false}
            />
            <Label check>Femenino</Label>
          </FormGroup>
        </FormGroup>

        <FormGroup>
          <Label for="rol">Rol</Label>
          <Input
            type="select"
            id="rol"
            name="rol"
            value={formulario.rol}
            onChange={manejarCambio}
            required
          >
            <option value="">Seleccione</option>
            <option value="Admin">Admin</option>
            <option value="Usuario">Usuario</option>
            <option value="Invitado">Invitado</option>
          </Input>
        </FormGroup>

        <FormGroup check className="mb-3">
          <Input
            type="checkbox"
            id="opciones"
            name="opciones"
            checked={formulario.opciones}
            onChange={manejarCambio}
          />
          <Label for="opciones" check>
            Acepto los términos y condiciones
          </Label>
        </FormGroup>

        <FormGroup>
          <Label for="notas">Notas</Label>
          <Input
            type="textarea"
            id="notas"
            name="notas"
            value={formulario.notas}
            onChange={manejarCambio}
          />
        </FormGroup>

        <FormGroup>
          <Label for="fechaRegistro">Fecha de registro</Label>
          <Input
            type="date"
            id="fechaRegistro"
            name="fechaRegistro"
            value={formulario.fechaRegistro}
            onChange={manejarCambio}
            required
          />
        </FormGroup>

        {/* Botones */}
        <Button color="primary" type="submit" className="me-2">
          Enviar
        </Button>

        <Button color="info" type="button" onClick={toggleModal} className="me-2">
          Mostrar
        </Button>

        <Button color="secondary" type="button" onClick={reiniciarFormulario}>
          Reiniciar
        </Button>
      </Form>

      {/* Modal */}
      <Modal isOpen={modalAbierto} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Datos del Formulario</ModalHeader>
        <ModalBody>
          {!datosGuardados ? (
            <p>No hay datos para mostrar.</p>
          ) : (
            <>
              <p><strong>Nombre:</strong> {datosGuardados.nombre}</p>
              <p><strong>Apellido:</strong> {datosGuardados.apellido}</p>
              <p><strong>Email:</strong> {datosGuardados.email}</p>
              <p><strong>Contraseña:</strong> {datosGuardados.contraseña}</p>
              <p><strong>Edad:</strong> {datosGuardados.edad}</p>
              <p><strong>Género:</strong> {datosGuardados.genero === null ? 'No seleccionado' : datosGuardados.genero ? 'Masculino' : 'Femenino'}</p>
              <p><strong>Rol:</strong> {datosGuardados.rol}</p>
              <p><strong>Aceptó términos:</strong> {datosGuardados.opciones ? 'Sí' : 'No'}</p>
              <p><strong>Notas:</strong> {datosGuardados.notas}</p>
              <p><strong>Fecha de registro:</strong> {datosGuardados.fechaRegistro}</p>
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

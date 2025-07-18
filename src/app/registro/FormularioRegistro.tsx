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
  FormFeedback,
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
  const [datosGuardados, setDatosGuardados] = useState<typeof estadoInicial | null>(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [errores, setErrores] = useState({
    nombre: '',
    apellido: '',
    email: '',
    edad: '',
    fechaRegistro: '',
  });

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

    setFormulario((prev) => ({ ...prev, [name]: nuevoValor }));

    const nuevosErrores = { ...errores };

    if (name === 'nombre') {
      const regex = /^[A-Za-zÀ-ÿ\u00f1\u00d1\s]*$/;
      nuevosErrores.nombre = regex.test(nuevoValor) && nuevoValor.trim() !== ''
        ? ''
        : 'Este campo solo acepta letras y espacios.';
    }

    if (name === 'apellido') {
      const regex = /^[A-Za-zÀ-ÿ\u00f1\u00d1\s]*$/;
      nuevosErrores.apellido = regex.test(nuevoValor) && nuevoValor.trim() !== ''
        ? ''
        : 'Este campo solo acepta letras y espacios.';
    }

    if (name === 'email') {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      nuevosErrores.email = regex.test(nuevoValor)
        ? ''
        : 'Debe tener formato de correo electrónico válido.';
    }

    if (name === 'edad') {
      const edadNum = Number(nuevoValor);
      nuevosErrores.edad =
        !isNaN(edadNum) && edadNum >= 1 && edadNum <= 100 && Number.isInteger(edadNum)
          ? ''
          : 'Este campo solo acepta números entre 1 y 100.';
    }

    if (name === 'fechaRegistro') {
      const hoy = new Date();
      const fechaSeleccionada = new Date(nuevoValor + 'T00:00:00');
      hoy.setHours(0, 0, 0, 0);
      nuevosErrores.fechaRegistro =
        fechaSeleccionada >= hoy
          ? ''
          : 'No se permiten fechas anteriores al día de hoy.';
    }

    setErrores(nuevosErrores);
  };

  const validarFormulario = () => {
    return (
      errores.nombre === '' &&
      errores.apellido === '' &&
      errores.email === '' &&
      errores.edad === '' &&
      errores.fechaRegistro === ''
    );
  };

  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validarFormulario()) return;
    setDatosGuardados(formulario);
    setFormulario(estadoInicial);
    setErrores({
      nombre: '',
      apellido: '',
      email: '',
      edad: '',
      fechaRegistro: '',
    });
  };

  const toggleModal = () => setModalAbierto(!modalAbierto);

  const reiniciarFormulario = () => {
    setFormulario(estadoInicial);
    setErrores({
      nombre: '',
      apellido: '',
      email: '',
      edad: '',
      fechaRegistro: '',
    });
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
                invalid={!!errores.nombre}
                valid={formulario.nombre !== '' && !errores.nombre}
                required
              />
              <FormFeedback>{errores.nombre}</FormFeedback>
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
                invalid={!!errores.apellido}
                valid={formulario.apellido !== '' && !errores.apellido}
                required
              />
              <FormFeedback>{errores.apellido}</FormFeedback>
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
            invalid={!!errores.email}
            valid={formulario.email !== '' && !errores.email}
            required
          />
          <FormFeedback>{errores.email}</FormFeedback>
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
            invalid={!!errores.edad}
            valid={formulario.edad !== '' && !errores.edad}
            required
          />
          <FormFeedback>{errores.edad}</FormFeedback>
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
            invalid={!!errores.fechaRegistro}
            valid={formulario.fechaRegistro !== '' && !errores.fechaRegistro}
            required
          />
          <FormFeedback>{errores.fechaRegistro}</FormFeedback>
        </FormGroup>

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
              <p><strong>Género:</strong> {datosGuardados.genero ? 'Masculino' : 'Femenino'}</p>
              <p><strong>Rol:</strong> {datosGuardados.rol}</p>
              <p><strong>Términos:</strong> {datosGuardados.opciones ? 'Sí' : 'No'}</p>
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

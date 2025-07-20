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
  Table,
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
  const [registros, setRegistros] = useState<typeof estadoInicial[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modalEditarAbierto, setModalEditarAbierto] = useState(false);
  const [formularioEdicion, setFormularioEdicion] = useState(estadoInicial);
  const [indiceEditar, setIndiceEditar] = useState<number | null>(null);

  const [errores, setErrores] = useState({
    nombre: '',
    apellido: '',
    email: '',
    edad: '',
    fechaRegistro: '',
  });

  const manejarCambio = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    edicion = false
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

    const setFunc = edicion ? setFormularioEdicion : setFormulario;
    const valores = edicion ? formularioEdicion : formulario;

    setFunc({ ...valores, [name]: nuevoValor });

    if (!edicion) validarCampo(name, nuevoValor);
  };

  const validarCampo = (name: string, valor: any) => {
    const nuevosErrores = { ...errores };

    if (name === 'nombre' || name === 'apellido') {
      const regex = /^[A-Za-zÀ-ÿ\u00f1\u00d1\s]*$/;
      nuevosErrores[name] = regex.test(valor) && valor.trim() !== ''
        ? ''
        : 'Este campo solo acepta letras y espacios.';
    }

    if (name === 'email') {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      nuevosErrores.email = regex.test(valor)
        ? ''
        : 'Debe tener formato de correo electrónico válido.';
    }

    if (name === 'edad') {
      const edadNum = Number(valor);
      nuevosErrores.edad =
        !isNaN(edadNum) && edadNum >= 1 && edadNum <= 100 && Number.isInteger(edadNum)
          ? ''
          : 'Este campo solo acepta números entre 1 y 100.';
    }

    if (name === 'fechaRegistro') {
      const hoy = new Date();
      const fechaSeleccionada = new Date(valor + 'T00:00:00');
      hoy.setHours(0, 0, 0, 0);
      nuevosErrores.fechaRegistro =
        fechaSeleccionada >= hoy
          ? ''
          : 'No se permiten fechas anteriores al día de hoy.';
    }

    setErrores(nuevosErrores);
  };

  const validarFormulario = () => {
    return Object.values(errores).every((v) => v === '');
  };

  const manejarEnvio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validarFormulario()) return;
    setDatosGuardados(formulario);
    setRegistros((prev) => [...prev, formulario]);
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

  const eliminarRegistro = (index: number) => {
    const nuevosRegistros = registros.filter((_, i) => i !== index);
    setRegistros(nuevosRegistros);
  };

  const abrirModalEditar = (index: number) => {
    setIndiceEditar(index);
    setFormularioEdicion(registros[index]);
    setModalEditarAbierto(true);
  };

  const guardarEdicion = () => {
    if (indiceEditar === null) return;
    const nuevosRegistros = [...registros];
    nuevosRegistros[indiceEditar] = formularioEdicion;
    setRegistros(nuevosRegistros);
    setModalEditarAbierto(false);
    setIndiceEditar(null);
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

        <Button color="primary" type="submit" className="me-2">Guardar</Button>
        <Button color="info" type="button" onClick={toggleModal} className="me-2">Mostrar</Button>
        <Button color="secondary" type="button" onClick={reiniciarFormulario}>Reiniciar</Button>
      </Form>

      {/* Tabla de registros */}
      {registros.length > 0 && (
        <div className="mt-5">
          <h4>Registros guardados:</h4>
          <Table bordered striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Edad</th>
                <th>Género</th>
                <th>Rol</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {registros.map((r, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{r.nombre}</td>
                  <td>{r.apellido}</td>
                  <td>{r.email}</td>
                  <td>{r.edad}</td>
                  <td>{r.genero ? 'Masculino' : 'Femenino'}</td>
                  <td>{r.rol}</td>
                  <td>{r.fechaRegistro}</td>
                  <td>
                    <Button color="warning" size="sm" onClick={() => abrirModalEditar(i)} className="me-2">
                      ✏️
                    </Button>
                    <Button color="danger" size="sm" onClick={() => eliminarRegistro(i)}>
                      🗑️
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {/* Modal para mostrar datos */}
      <Modal isOpen={modalAbierto} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Datos del Último Registro</ModalHeader>
        <ModalBody>
          {datosGuardados ? (
            <>
              <p><strong>Nombre:</strong> {datosGuardados.nombre}</p>
              <p><strong>Apellido:</strong> {datosGuardados.apellido}</p>
              <p><strong>Email:</strong> {datosGuardados.email}</p>
              <p><strong>Edad:</strong> {datosGuardados.edad}</p>
              <p><strong>Género:</strong> {datosGuardados.genero ? 'Masculino' : 'Femenino'}</p>
              <p><strong>Rol:</strong> {datosGuardados.rol}</p>
              <p><strong>Fecha:</strong> {datosGuardados.fechaRegistro}</p>
            </>
          ) : (
            <p>No hay datos guardados aún.</p>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={toggleModal}>Cerrar</Button>
        </ModalFooter>
      </Modal>

      {/* Modal para editar */}
      <Modal isOpen={modalEditarAbierto} toggle={() => setModalEditarAbierto(false)}>
        <ModalHeader toggle={() => setModalEditarAbierto(false)}>Editar Registro</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="nombre">Nombre</Label>
              <Input
                type="text"
                name="nombre"
                value={formularioEdicion.nombre}
                onChange={(e) => manejarCambio(e, true)}
              />
            </FormGroup>
            {/* Agrega aquí los demás campos si quieres editarlos todos */}
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={guardarEdicion}>Guardar</Button>
          <Button onClick={() => setModalEditarAbierto(false)}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

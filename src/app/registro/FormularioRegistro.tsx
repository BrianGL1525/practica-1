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
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
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
  const [usuarioAleatorio, setUsuarioAleatorio] = useState<any | null>(null);

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
      const regex = /^[A-Za-zÀ-ÿ\s]*$/;
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
          : 'Solo números entre 1 y 100.';
    }

    if (name === 'fechaRegistro') {
      const hoy = new Date();
      const fechaSeleccionada = new Date(valor + 'T00:00:00');
      hoy.setHours(0, 0, 0, 0);
      nuevosErrores.fechaRegistro =
        fechaSeleccionada >= hoy ? '' : 'No se permiten fechas pasadas.';
    }

    setErrores(nuevosErrores);
  };

  const validarFormulario = () => {
    return Object.values(errores).every((v) => v === '');
  };

const manejarEnvio = (e: React.FormEvent) => {
  e.preventDefault();
  if (!validarFormulario()) return;

  setDatosGuardados(formulario); //  Se actualiza 
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
    setErrores({ nombre: '', apellido: '', email: '', edad: '', fechaRegistro: '' });
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

  const obtenerUsuarioAleatorio = async () => {
    try {
      const res = await fetch('https://randomuser.me/api/');
      const data = await res.json();
      setUsuarioAleatorio(data.results[0]);
    } catch (error) {
      console.error('Error al obtener usuario aleatorio:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="mb-4 text-primary">Formulario de Registro</h2>
      <Form onSubmit={manejarEnvio}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="nombre">Nombre</Label>
              <Input type="text" id="nombre" name="nombre" value={formulario.nombre} onChange={manejarCambio} invalid={!!errores.nombre} required />
              <FormFeedback>{errores.nombre}</FormFeedback>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="apellido">Apellido</Label>
              <Input type="text" id="apellido" name="apellido" value={formulario.apellido} onChange={manejarCambio} invalid={!!errores.apellido} required />
              <FormFeedback>{errores.apellido}</FormFeedback>
            </FormGroup>
          </Col>
        </Row>

        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" id="email" name="email" value={formulario.email} onChange={manejarCambio} invalid={!!errores.email} required />
          <FormFeedback>{errores.email}</FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="contraseña">Contraseña</Label>
          <Input type="password" id="contraseña" name="contraseña" value={formulario.contraseña} onChange={manejarCambio} required />
        </FormGroup>

        <FormGroup>
          <Label for="edad">Edad</Label>
          <Input type="number" id="edad" name="edad" value={formulario.edad} onChange={manejarCambio} invalid={!!errores.edad} required />
          <FormFeedback>{errores.edad}</FormFeedback>
        </FormGroup>

        <FormGroup tag="fieldset">
          <legend>Género</legend>
          <FormGroup check>
            <Input type="radio" name="genero" value="true" onChange={manejarCambio} checked={formulario.genero === true} required />
            <Label check>Masculino</Label>
          </FormGroup>
          <FormGroup check>
            <Input type="radio" name="genero" value="false" onChange={manejarCambio} checked={formulario.genero === false} />
            <Label check>Femenino</Label>
          </FormGroup>
        </FormGroup>

        <FormGroup>
          <Label for="rol">Rol</Label>
          <Input type="select" id="rol" name="rol" value={formulario.rol} onChange={manejarCambio} required>
            <option value="">Seleccione</option>
            <option value="Admin">Admin</option>
            <option value="Usuario">Usuario</option>
            <option value="Invitado">Invitado</option>
          </Input>
        </FormGroup>

        <FormGroup check>
          <Input type="checkbox" id="opciones" name="opciones" checked={formulario.opciones} onChange={manejarCambio} />
          <Label for="opciones" check>
            Acepto los términos y condiciones
          </Label>
        </FormGroup>

        <FormGroup>
          <Label for="notas">Notas</Label>
          <Input type="textarea" id="notas" name="notas" value={formulario.notas} onChange={manejarCambio} />
        </FormGroup>

        <FormGroup>
          <Label for="fechaRegistro">Fecha de registro</Label>
          <Input type="date" id="fechaRegistro" name="fechaRegistro" value={formulario.fechaRegistro} onChange={manejarCambio} invalid={!!errores.fechaRegistro} required />
          <FormFeedback>{errores.fechaRegistro}</FormFeedback>
        </FormGroup>

        <Button color="primary" type="submit" className="me-2">Guardar</Button>
        <Button color="info" type="button" onClick={toggleModal} className="me-2">Mostrar</Button>
        <Button color="secondary" type="button" onClick={reiniciarFormulario} className="me-2">Reiniciar</Button>
        <Button color="success" type="button" onClick={obtenerUsuarioAleatorio}>Obtener Usuario Aleatorio</Button>
      </Form>

      {usuarioAleatorio && (
        <Card className="mt-4">
          <CardHeader className="bg-primary text-white">
            {`${usuarioAleatorio.name.title} ${usuarioAleatorio.name.first} ${usuarioAleatorio.name.last}`}
          </CardHeader>
          <CardBody className="text-center">
            <CardImg
              src={usuarioAleatorio.picture.large}
              alt="Foto del usuario"
              className="img-thumbnail mb-3"
              style={{ maxWidth: '150px' }}
            />
            <p><strong>Email:</strong> {usuarioAleatorio.email}</p>
            <p><strong>Teléfono:</strong> {usuarioAleatorio.phone}</p>
            <p><strong>Edad:</strong> {usuarioAleatorio.dob.age}</p>
            <p><strong>Género:</strong> {usuarioAleatorio.gender === 'male' ? 'Masculino' : 'Femenino'}</p>
            <p><strong>País:</strong> {usuarioAleatorio.location.country}</p>
          </CardBody>
          <CardFooter>
            <strong>Dirección:</strong><br />
            {`${usuarioAleatorio.location.street.number} ${usuarioAleatorio.location.street.name}, `}
            {`${usuarioAleatorio.location.city}, ${usuarioAleatorio.location.state}, `}
            {`${usuarioAleatorio.location.postcode}`}
          </CardFooter>
        </Card>
        
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import datos from '@/data/datos.json';

export default function TablaPersonalizada() {
  const [modal, setModal] = useState(false);
  const [imagenActual, setImagenActual] = useState('');

  const toggleModal = (imagen: string) => {
    setImagenActual(imagen);
    setModal(!modal);
  };

  return (
    <div className="p-4">
      <h3>Tabla con Modal por Registro</h3>

      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Ícono</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((item, index) => (
            <tr key={item.id}>
              <th scope="row">{index + 1}</th>
              <td>{item.nombre}</td>
              <td>{item.rol}</td>
              <td>
                <FontAwesomeIcon icon={faUser} />
              </td>
              <td>
                <Button
                  color="secondary"
                  size="sm"
                  onClick={() => toggleModal(item.imagen)}
                >
                  {item.accion}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader toggle={() => setModal(!modal)}>Imagen del Usuario</ModalHeader>
        <ModalBody className="text-center">
          <img src={imagenActual} alt="imagen del usuario" width="100%" />
        </ModalBody>
      </Modal>
    </div>
  );
}

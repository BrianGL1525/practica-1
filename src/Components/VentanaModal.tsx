'use client';

import { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

export default function VentanaModal() {
  const [abierto, setAbierto] = useState(false);

  const toggle = () => setAbierto(!abierto);

  return (
    <div>
      <Button color="info" onClick={toggle}>
        Mostrar Modal
      </Button>

      <Modal isOpen={abierto} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal</ModalHeader>
        <ModalBody>
          Este tiene el contenido del modal. 
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

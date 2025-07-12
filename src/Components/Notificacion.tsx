'use client';

import React, { useState } from 'react';
import { Button, Toast, ToastBody, ToastHeader } from 'reactstrap';

export default function Notificacion() {
  const [mostrar, setMostrar] = useState(false);

  const toggle = () => setMostrar(!mostrar);

  return (
    <div style={{ position: 'relative', minHeight: '150px' }}>
      <Button color="primary" onClick={toggle}>
        Mostrar notificación
      </Button>

      <div style={{ position: 'absolute', top: 10, right: 10 }}>
        <Toast isOpen={mostrar}>
          <ToastHeader icon="primary" toggle={toggle}>
            Notificación
          </ToastHeader>
          <ToastBody>
            ¡Este es un Toast azul usando Reactstrap!
          </ToastBody>
        </Toast>
      </div>
    </div>
  );
}

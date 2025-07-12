'use client';

import { useState } from 'react';

export default function ImagenToggle() {
  const [mostrarPrimera, setMostrarPrimera] = useState(true);

  const cambiarImagen = () => {
    setMostrarPrimera(!mostrarPrimera);
  };

  return (
    <div>
      <img
        src={mostrarPrimera ? "/imagenes/troca1.png" : "/imagenes/troca2.png"}
        alt="Camioneta"
        style={{ width: '300px', height: '200px', marginBottom: '10px' }}
      />
      <button onClick={cambiarImagen}>
        Cambiar imagen
      </button>
    </div>
  );
}

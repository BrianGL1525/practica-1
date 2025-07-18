'use client';

import { useState, useEffect } from 'react';

export default function CambiarFondo() {
  const [color, setColor] = useState('white');

  const cambiarColor = () => {
    // Cambia entre blanco y un azul mas claro
    const nuevoColor = color === 'white' ? '#cce7ff' : 'white';
    setColor(nuevoColor);
  };

  useEffect(() => {
    // Aplica el color al fondo del body
    document.body.style.backgroundColor = color;

    // Limpieza en esta parte es opcional
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [color]);

  return (
    <button onClick={cambiarColor}>
      Cambiar fondo
    </button>
  );
}

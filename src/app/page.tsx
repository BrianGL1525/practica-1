import Imagen from '@/Components/Imagen';
import Titulo from '@/Components/Titulo';
import Parrafo from '@/Components/Parrafo';
import Contador from '@/Components/Contador';
import ImagenToggle from '@/Components/ImagenToggle';
import CambiarFondo from '@/Components/CambiarFondo';
import BotonReactstrap from '@/Components/BotonReactstrap';
import Notificacion from '@/Components/Notificacion'; 
import VentanaModal from '@/Components/VentanaModal';
import Carrusel from '@/Components/Carrusel';
import Iconos from '@/Components/Iconos';
import TablaPersonalizada from '@/Components/TablaPersonalizada';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <Titulo
        texto="Bienvenido a mi practica con react"
        color="darkblue"
        fontSize="40px"
        fontFamily="Verdana"
      />

      <Parrafo
        contenido="Este es un párrafo generado por medios de componentes y demas en base
        a las diferentes practicas que hemos realizado por medio de reacstrap y boopstrap"
        color="gray"
        fontSize="20px"
        fontFamily="Georgia"
      />

      <Imagen
        src="/imagenes/troca1.png"
        alt="Camioneta 1"
        width="300px"
        height="200px"
      />
     

      <ImagenToggle />
      <CambiarFondo />
      <Contador />
      <BotonReactstrap />
      <Notificacion /> {}
      <VentanaModal />
      <Carrusel />
      <Iconos />
      <TablaPersonalizada />
       <Link href="/registro">
      <button style={{ marginTop: '20px' }}>Ir al Formulario de Registro</button>
      </Link>
    </main>
  );
}

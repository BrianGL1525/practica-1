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

export default function Home() {
  return (
    <main>
      <Titulo
        texto="Bienvenido a mi práctica de React"
        color="darkblue"
        fontSize="40px"
        fontFamily="Verdana"
      />

      <Parrafo
        contenido="Este es un párrafo generado desde un componente."
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
    </main>
  );
}

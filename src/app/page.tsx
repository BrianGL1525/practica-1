import Imagen from '@/Components/Imagen';
import Titulo from '@/Components/Titulo';
import Parrafo from '@/Components/Parrafo';

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
        src="https://via.placeholder.com/300x200"
        alt="Imagen de prueba"
        width="300px"
        height="200px"
      />
    </main>
  );
}


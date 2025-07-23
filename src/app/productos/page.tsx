'use client';

import { useEffect, useState } from 'react';
import {
  Table,
  Spinner,
  Container,
  Card,
  CardHeader,
  Button
} from 'reactstrap';

type Producto = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export default function Productos() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);

  // Baraja un array aleatoriamente
  const barajar = (array: Producto[]) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  // Cargar productos y agregar sin repetir
  const obtenerProductos = async () => {
    setCargando(true);
    try {
      const res = await fetch(`https://fakestoreapi.com/products`);
      const data: Producto[] = await res.json();

      const nuevosBarajados = barajar(data);

      // Filtrar los que ya están
      const nuevos = nuevosBarajados.filter(
        (nuevo) => !productos.some((p) => p.id === nuevo.id)
      );

      setProductos((prev) => [...prev, ...nuevos]);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  return (
    <Container className="mt-4">
      <Card>
        <CardHeader className="bg-success text-white">
          Lista de Productos
        </CardHeader>

        {cargando ? (
          <div className="text-center p-4">
            <Spinner color="primary" />
            <p className="mt-2">Cargando productos...</p>
          </div>
        ) : (
          <>
            <Table responsive bordered hover striped>
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Título</th>
                  <th>Precio</th>
                  <th>Descripción</th>
                  <th>Categoría</th>
                  <th>Imagen</th>
                  <th>Rating</th>
                  <th>Votos</th>
                </tr>
              </thead>
              <tbody>
                {productos.slice(0, 15).map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.id}</td>
                    <td>{producto.title}</td>
                    <td>${producto.price}</td>
                    <td>{producto.description.slice(0, 60)}...</td>
                    <td>{producto.category}</td>
                    <td>
                      <img src={producto.image} alt="producto" width={50} />
                    </td>
                    <td>{producto.rating?.rate}</td>
                    <td>{producto.rating?.count}</td>
                  </tr>
                ))}
              </tbody>
            </Table>

            <div className="text-center mb-4">
              <Button color="primary" onClick={obtenerProductos}>
                Cargar otros productos
              </Button>
            </div>
          </>
        )}
      </Card>
    </Container>
  );
}

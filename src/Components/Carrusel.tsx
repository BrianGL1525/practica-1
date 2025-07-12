'use client';

import Carousel from 'react-bootstrap/Carousel';

export default function Carrusel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/imagenes/troca2.png"
          alt="Primera imagen"
        />
        <Carousel.Caption>
          <h3 className="text-success"></h3>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/imagenes/troca3.png"
          alt="Segunda imagen"
        />
        <Carousel.Caption>
          <h3 className="text-success"></h3>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/imagenes/troca4.png"
          alt="Tercera imagen"
        />
        <Carousel.Caption>
          <h3 className="text-success"></h3>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/imagenes/troca5.png"
          alt="Cuarta imagen"
        />
        <Carousel.Caption>
          <h3 className="text-success"></h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

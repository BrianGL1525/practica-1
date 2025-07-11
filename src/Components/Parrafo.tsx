type ParrafoProps = {
  contenido: string;
  color?: string;
  fontSize?: string;
  fontFamily?: string;
};

export default function Parrafo({
  contenido,
  color = "black",
  fontSize = "18px",
  fontFamily = "Arial",
}: ParrafoProps) {
  return (
    <p style={{ color, fontSize, fontFamily }}>
      {contenido}
    </p>
  );
}

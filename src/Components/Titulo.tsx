type TituloProps = {
  texto: string;
  color?: string;
  fontSize?: string;
  fontFamily?: string;
};

export default function Titulo({
  texto,
  color = "black",
  fontSize = "32px",
  fontFamily = "Arial",
}: TituloProps) {
  return (
    <h1 style={{ color, fontSize, fontFamily }}>
      {texto}
    </h1>
  );
}

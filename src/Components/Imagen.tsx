type ImagenProps = {
  src: string;
  alt: string;
  width?: string;
  height?: string;
};

export default function Imagen({
  src,
  alt,
  width = "300px",
  height = "200px",
}: ImagenProps) {
  return (
    <img src={src} alt={alt} style={{ width, height }} />
  );
}

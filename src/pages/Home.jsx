import { Link } from "../Link.jsx";
export default function HomePage() {
  return (
    <>
      <h1>Pagina Home</h1>
      <p>Esta es la pagina inicial</p>
      <Link to="/about">Ir a About...</Link>
    </>
  );
}

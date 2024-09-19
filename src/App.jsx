import "./App.css";
import HomePage from "./pages/Home.jsx";
import AboutPage from "./pages/About.jsx";
import Page404 from "./pages/404.jsx";

import { Router } from "./Router.jsx";
const appRoutes = [
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/about",
    Component: AboutPage,
  },
  {
    path: "/xd",
    Component: () => (
      <>
        <h1>XD</h1>
      </>
    ),
  },
  {
    path: "/search/:query",
    Component: ({ routeParams }) => (
      <>
        <div>
          <h1>Buscador</h1>
        </div>
        <h2>Has buscado {routeParams.query}</h2>
      </>
    ),
  },
];

function App() {
  return (
    <main>
      <Router routes={appRoutes} defaultComponent={Page404} />
    </main>
  );
}

export default App;

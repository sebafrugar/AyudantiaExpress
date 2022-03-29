const express = require("express");
const app = express();
const port = 8080;
app.use(express.json());
app.listen(port, () => console.log(`Listening on port: ${port}`));

const peliculas = [
  {
    id: 1,
    nombre: "Bestia",
  },
  {
    id: 2,
    nombre: "Dont look up",
  },
  {
    id: 3,
    nombre: "Drive my car",
  },
  {
    id: 4,
    nombre: "Coda",
  },
  {
    id: 5,
    nombre: "Belfast",
  },
  {
    id: 6,
    nombre: "Dune",
  },
  {
    id: 7,
    nombre: "Summer of soul",
  },
];

const ganadoras = {
  mejorPelicula: "",
  mejorGuion: "",
  mejorFotografia: "",
  mejorCorto: "",
  mejorDocumental: "",
};

app.get("/api/peliculas", (req, res) => {
  res.json({ peliculas: peliculas });
});

app.post("/api/pelicula", (req, res) => {
  peliculas.push(req.body);
  res.json({ nuevaPeli: req.body });
});

app.post("/api/ganadora/:categoria/:id", (req, res) => {
  const { categoria, id } = req.params;
  const peliculaSeleccionada = peliculas.filter(
    (pelicula, i) => parseInt(id) === pelicula.id
  );
  switch (categoria) {
    case "fotografia":
      ganadoras.mejorFotografia = peliculaSeleccionada[0].nombre;
      break;
    case "guion":
      ganadoras.mejorGuion = peliculaSeleccionada[0].nombre;
      break;
    case "pelicula":
      ganadoras.mejorPelicula = peliculaSeleccionada[0].nombre;
      break;
    case "corto":
      ganadoras.mejorCorto = peliculaSeleccionada[0].nombre;
      break;
    case "documental":
      ganadoras.mejorDocumental = peliculaSeleccionada[0].nombre;
      break;
    default:
      break;
  }
  console.log(peliculaSeleccionada[0]);
});

app.get("/api/ganadoras", (req, res) => {
  res.json({ ganadoras: ganadoras });
});

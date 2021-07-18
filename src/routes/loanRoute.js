const express = require("express");
const app = express();
const { Loan } = require("../bd/Sequalize");
const { Usuario } = require("../bd/Sequalize");
const { Book } = require("../bd/Sequalize");

// todos los prestamos
app.get("/prestamo", async (req, res) => {
  Loan.findAll().then((loans) => {
    res.status(200).json({ loans });
  });
});

// prestamo por email_usuario
app.get("/prestamo/usuario/:email", async (req, res) => {
  console.log(req.params);
  const usuario = await Usuario.findAll({ where: { email: req.params.email } });
  if (usuario) {
    const loan = await Loan.findAll({ where: { id_usuario: usuario.id } });
    if (loan) {
      res.status(200).json({ success: loan });
    } else {
      res
        .status(400)
        .json({ error: "Error no se ha podido encontrar el prestamo" });
    }
  } else {
    res
      .status(400)
      .json({ error: "Error no se ha podido encontrar el prestamo" });
  }
});
// prestamo por id
app.get("/prestamo/:id", async (req, res) => {
  console.log(req.params);
  const loan = await Loan.findAll({ where: { id: req.params.id } });
  if (loan) {
    res.status(200).json({ success: loan });
  } else {
    res
      .status(400)
      .json({ error: "Error no se ha podido encontrar el prestamo" });
  }
});

// prestamo por id libro
app.get("/prestamo/libro/:id_usuario", async (req, res) => {
  console.log(req.params);
  const book = await Book.findAll({ where: { id: req.params.id_usuario } });
  if (book) {
    const loan = await Loan.findAll({ where: { id_libro: book.id } });
    if (loan) {
      res.status(200).json({ success: loan });
    } else {
      res
        .status(400)
        .json({ error: "Error no se ha podido encontrar el prestamo" });
    }
  } else {
    res
      .status(400)
      .json({ error: "Error no se ha podido encontrar el prestamo" });
  }
});

// crear prestamos
app.post("/prestamo", async (req, res) => {
  console.log(req.body);
  const book = await Book.findOne({ where: { id: req.body.id_libro } });
  console.log(book);
  if (book) {
    if (book.cantidad > 0) {
      Loan.create(req.body);
      Book.update(
        {
          cantidad: 0,
        },
        {
          where: {
            id: req.body.id_libro,
          },
        }
      )
        .then(() => {
          res.json({ mensaje: "Prestamo Creado" });
        })
        .catch((error) => {
          throw new Error(error);
        });
    } else {
      res.status(400).json({ error: "No hay ejemplares disponibles" });
    }
  } else {
    res.status(400).json({ error: "No se ha encontrado el libro" });
  }
});

//actualizar un prestamo

app.put("/prestamo/actualizar/:id", async (req, res) => {
  const loan = await Loan.findOne({ where: { id: req.params.id } });
  console.log(loan);
  if (loan) {
    Book.update(
      {
        cantidad: 1,
      },
      {
        where: {
          id: loan.id_libro,
        },
      }
    ).then(()=>{
        Book.update(
            {
              cantidad: 0,
            },
            {
              where: {
                id: req.body.id_libro,
              },
            }
          ).then(()=>{
            Loan.update(
                {
                  id_libro: req.body.id_libro,
                },
                {
                  where: {
                    id: loan.id,
                  },
                }
              )
                .then(() => {
                  res.json({ mensaje: "Prestamo Actualizado" });
                })
                .catch((error) => {
                  throw new Error(error);
                });
          }).catch((error) => {
            throw new Error(error);
        });
    }).catch((error) => {
        throw new Error(error);
    });
    
  } else {
    res.status(400).json({ error: "El Prestamo no existe" });
  }
});

//eliminar un prestamo
app.delete("/prestamo/:id", async (req, res) => {
  const loan = await Loan.findOne({ where: { id: req.params.id } });
  if (loan) {
    Book.update(
      {
        cantidad: 1,
      },
      {
        where: {
          id: loan.id_libro,
        },
      }
    );
    loan.destroy().then(() => {
      res.status(200).json({ mensaje: "Prestamo Eliminado" });
    });
  } else {
    res.status(400).json({ error: "El Prestamo no Existe" });
  }
});

module.exports = app;

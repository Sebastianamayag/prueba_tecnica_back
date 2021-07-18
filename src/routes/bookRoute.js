const express= require('express');
const app=express();
const {Book}=require('../bd/Sequalize');
const {Loan}=require('../bd/Sequalize');

// todos los libros
app.get('/libro',async(req,res)=>{
    Book.findAll()
    .then(books=>{
        res.status(200).json({books});
    });
});

// libro por id
app.get('/libro/:id',async(req,res)=>{
    console.log(req.params)
    const book =await Book.findAll({ where: { id:req.params.id}});
    if (book) {
        res.status(200).json({ success: book });
    } else {
        res.status(400).json({ error: 'Error no se ha podido encontrar el libro' });
    }
});

// crear libro
app.post('/libro',async(req,res)=>{
    console.log(req.body);
    if(req.body.cantidad>1){
        res.status(400).json({ error: 'No se puede tener mas de 1 ejemplar por libro' })
    }else{
        Book.create(req.body);
        res.status(200).json({"success":"Libro creado correctamente"});
    }
})


//actualizar un libro

app.put('/libro/actualizar/:id',async(req,res)=>{
    if(req.body.cantidad<=1){
        const book = await Book.findOne({ where: { id: req.params.id } });
        if (book) {
            Book.update(
                {
                    nombre: req.body.nombre,
                    cantidad:req.body.cantidad
                },
                { 
                    where: 
                    {
                        id: req.params.id
                    }
                }
            ).then(() => { res.json({ 'mensaje':'Libro Actualizado'});}
            ).catch((error) => { throw new Error(error)});
        } else {
            res.status(400).json({ error:'El libro no existe' })
        }
    }else{
        res.status(400).json({ error:'No puede haber mas de un ejemplar por libro' })
    }

});

//eliminar un libro
app.delete('/libro/:id',async(req,res)=>{
    const book = await Book.findOne({ where: { id: req.params.id } });
    if(book){
        const loan = await Loan.findOne({ where: { id_libro: req.params.id } });
        if(loan){
            loan.destroy();
        }
        book.destroy()
        .then(()=>{
            res.status(200).json({ 'mensaje':'Libro Eliminado' })
        })
    }else{
        res.status(400).json({ error:'El Libro no Existe' })
    }
});



module.exports=app;
const express= require('express');
const app=express();
const {Usuario}=require('../bd/Sequalize');
const {Loan}=require('../bd/Sequalize');
const bcrypt = require('bcryptjs');

// todos los usuarios
app.get('/usuario',async(req,res)=>{
    Usuario.findAll({attributes: ["id","nombre", "apellidos","email"]})
    .then(usuario=>{
        res.status(200).json({usuario});
    });
});

// usuario por email
app.get('/usuario/:email',async(req,res)=>{
    console.log(req.params)
    const usuario =await Usuario.findAll({ where: { email:req.params.email},attributes:["nombre", "apellidos","email"]});
    if (usuario) {
        res.status(200).json({ usuario }); 
    } else {
        res.status(400).json({ error: 'Error no se ha encontrado el usuario' });
    }
});

// usuario por id
app.get('/usuario/loc/:id',async(req,res)=>{
    console.log(req.params)
    const usuario =await Usuario.findAll({ where: { id:req.params.id},attributes:["nombre", "apellidos","email"]});
    if (usuario) {
        res.status(200).json({ usuario }); 
    } else {
        res.status(400).json({ error: 'Error no se ha encontrado el usuario' });
    }
});

// crear usuarios
app.post('/usuario',async(req,res)=>{
    console.log(req.body);
    const usuario = await Usuario.findOne({ where: { email: req.body.email } });
    if(usuario){
        res.status(400).json({ "error": `Ya existe un usuario registrado con el email: ${req.body.email}` })
    }
    else{
        req.body.contra = bcrypt.hashSync(req.body.contra, 10);
        Usuario.create(req.body);
        res.status(200).json({"success":"Usuario creado correctamente"});
    }
})


//actualizar un usuario

app.put('/usuario/actualizar/:email',async(req,res)=>{
    const usuario = await Usuario.findOne({ where: { email: req.params.email } });
    if (usuario) {
        Usuario.update(
            {
                nombre: req.body.nombre,
                apellidos:req.body.apellidos,
                email:req.body.email
            },
            { 
                where: 
                {
                    email: req.params.email
                }
            }
        ).then(() => { res.json({ 'mensaje':'Usuario Actualizado'});}
        ).catch((error) => { throw new Error(error)});
    } else {
        res.status(400).json({ 'error':'El Usuario no Existe' })
    }
});

//eliminar un usuario
app.delete('/usuario/:email',async(req,res)=>{
    const usuario = await Usuario.findOne({ where: { email: req.params.email } });
    if(usuario){
        const loan = await Loan.findOne({ where: { id_usuario: usuario.id } });
        if(loan){
            loan.destroy()
        }
        usuario.destroy()
        .then(()=>{
            res.status(200).json({ 'mensaje':'Usuario Eliminado' })
        })

    }else{
        res.status(400).json({ error:'El Usuario no Existe' })
    }
});



module.exports=app;
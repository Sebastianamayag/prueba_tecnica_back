const express=require('express');
const app=express();
const cors=require('cors');

app.use(express.json({limit:'15MB'}));
app.use(cors());

app.use(require('./src/routes/userRoute'));
app.use(require('./src/routes/bookRoute'));
app.use(require('./src/routes/loanRoute'));

app.listen(4000,()=>{
    console.log('Servidor corriendo en el puerto 4000')
})